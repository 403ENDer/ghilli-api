import WebSocket, { WebSocketServer } from "ws";
import { Server } from "http";
import { parse } from "url";
import querystring from "querystring";
import { matchModel } from "./model/matchModel";

interface Client {
  id: string;
  name: string;
  ws: WebSocket;
}
interface Teams {
  [team: string]: {
    score: number;
    players: [];
  };
}
interface MatchRoom {
  matchId: string;
  teams: Teams;
  viewers: Client[];
  scorer: Client[];
}

const matchRooms: Record<string, MatchRoom> = {};

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws: WebSocket, req: any) => {
    const { pathname, query } = parse(req.url || "");
    const params = querystring.parse(query || "") as {
      scorerId?: string;
      matchId?: string;
    };

    if (pathname === "/viewer/") {
      const { matchId } = params;
      console.log(params);
      if (!matchId) {
        ws.send(
          JSON.stringify({
            error: {
              message: "Invalid request. 'matchId' is required for viewer.",
            },
          })
        );
        ws.close();
        return;
      }

      if (!matchRooms[matchId]) {
        ws.send(
          JSON.stringify({
            error: {
              message: "Match not found or not live.",
            },
          })
        );
        ws.close();
        return;
      }

      const viewerId = `viewer_${Date.now()}_${Math.random()}`;
      const viewerClient: Client = {
        id: viewerId,
        name: viewerId,
        ws,
      };
      matchRooms[matchId].viewers.push(viewerClient);

      const room = matchRooms[matchId];
      ws.send(
        JSON.stringify({
          data: {
            type: "Viewer connected",
            matchId,
            scores: {
              teamA: room.teams["Tamil Thalaivas"].score,
              teamB: room.teams["HK"].score,
            },
            liveViewers: room.viewers.length,
          },
        })
      );

      ws.on("close", () => {
        const index = room.viewers.findIndex((v) => v.id === viewerId);
        if (index !== -1) {
          room.viewers.splice(index, 1);
        }
      });

      return;
    }

    const { scorerId, matchId } = params;

    if (!matchId || !scorerId) {
      ws.send(
        JSON.stringify({
          error: {
            message:
              "Invalid request. 'matchId' and 'scorer' are required to start the match.",
          },
        })
      );
      ws.close();
      return;
    }

    try {
      console.log(matchId);
      const match = await matchModel.findByIdAndUpdate(matchId, {
        status: "live",
      });

      if (!match) {
        ws.send(
          JSON.stringify({
            error: {
              message: "Match not found.",
            },
          })
        );
        ws.close();
        return;
      }
      const teamA = "Tamil Thalaivas";
      const teamB = "HK";
      if (!matchRooms[matchId]) {
        matchRooms[matchId] = {
          matchId,
          viewers: [],
          scorer: [],
          teams: {
            [teamA]: {
              score: 0,
              players: [],
            },
            [teamB]: {
              score: 0,
              players: [],
            },
          },
        };
      }

      matchRooms[matchId].scorer.push({
        id: scorerId,
        name: scorerId,
        ws,
      });

      ws.send(
        JSON.stringify({
          data: {
            type: "Match started",
            scorerId,
            teams: {
              teamA: "Nan",
              teamB: "Avan",
            },
            scores: {
              teamA: 0,
              teamB: 0,
            },
            playersOnMat: {
              teamA: 7,
              teamB: 7,
            },
            liveViewers: matchRooms[matchId].viewers.length,
          },
        })
      );

      ws.on("message", async (message: string) => {
        let data;
        console.log(message);
        try {
          data = JSON.parse(message);
        } catch (error) {
          console.error(error);
          ws.send(
            JSON.stringify({
              message: "Invalid JSON",
            })
          );
          return;
        }

        if (data.type === "scoreUpdate") {
          const room = matchRooms[matchId];
          if (room) {
            if (data.scores) {
              if (typeof data.scores.teamA === "number") {
                room.teams[teamA].score = data.scores.teamA;
              }
              if (typeof data.scores.teamB === "number") {
                room.teams[teamB].score = data.scores.teamB;
              }
            }
            room.viewers.forEach((viewer) => {
              if (viewer.ws.readyState === WebSocket.OPEN) {
                viewer.ws.send(
                  JSON.stringify({
                    data: {
                      type: "scoreUpdate",
                      scores: room.teams,
                    },
                  })
                );
              }
            });
            room.scorer.forEach((scorer) => {
              if (scorer.ws.readyState === WebSocket.OPEN) {
                scorer.ws.send(
                  JSON.stringify({
                    data: {
                      type: "scoreUpdate",
                      scores: room.teams,
                    },
                  })
                );
              }
            });
          }
        }
      });

      ws.on("close", () => {
        const room = matchRooms[matchId];
        if (room) {
          const index = room.scorer.findIndex((s) => s.id === scorerId);
          if (index !== -1) {
            room.scorer.splice(index, 1);
          }
        }
      });
    } catch (err) {
      console.error("WebSocket Error:", err);
      ws.send(JSON.stringify({ error: { message: "Server error" } }));
      ws.close();
    }
  });

  console.log("WebSocket server initialized");
}
