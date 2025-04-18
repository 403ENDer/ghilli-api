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
    const { query } = parse(req.url || "");
    const params = querystring.parse(query || "") as {
      scorer?: string;
      matchId?: string;
    };

    const { scorer, matchId } = params;

    if (!matchId || !scorer) {
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
        id: scorer,
        name: scorer,
        ws,
      });

      ws.send(
        JSON.stringify({
          data: {
            type: "Match started",
            scorer,
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
        try {
          data = JSON.parse(message);
        } catch (error) {
          console.error(error);
          ws.send(
            JSON.stringify({
              message: "Invaldi JSON",
            })
          );
        }

        if (data.type === "event") {
          const event = data.event;
          if (event.isRaiderSafe) {
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
