import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Ghilli API Documentation',
      version: '1.0.0',
      description: 'API for kabadi tournament',
    },
    servers: [{ url: 'http://localhost:8000/' }],
    components: {
      schemas: {
        Match: {
          type: 'object',
          required: ['name', 'tournament', 'ground', 'teamA', 'teamB', 'date', 'status'],
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated ID of the match',
            },
            name: {
              type: 'string',
              description: 'Name of the match',
            },
            tournament: {
              type: 'string',
              description: 'ObjectId reference to the tournament',
            },
            ground: {
              type: 'string',
              description: 'ObjectId reference to the ground',
            },
            teamA: {
              type: 'string',
              description: 'ObjectId reference to Team A',
            },
            teamB: {
              type: 'string',
              description: 'ObjectId reference to Team B',
            },
            teamAscore: {
              type: 'number',
              default: 0,
              description: 'Score of Team A',
            },
            teamBscore: {
              type: 'number',
              default: 0,
              description: 'Score of Team B',
            },
            wonBy: {
              type: 'string',
              nullable: true,
              description: 'ObjectId reference to the team that won',
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time of the match',
            },
            status: {
              type: 'string',
              enum: ['scheduled', 'live', 'completed', 'cancelled'],
              description: 'Status of the match',
            },
          },
          example: {
            _id: '60af8840d1fd5c1f4c8c9ef3',
            name: 'Final Match',
            tournament: '60af87c4d1fd5c1f4c8c9ef2',
            ground: '60af86b9d1fd5c1f4c8c9ef1',
            teamA: '60af85d8d1fd5c1f4c8c9ef0',
            teamB: '60af85d8d1fd5c1f4c8c9eee',
            teamAscore: 120,
            teamBscore: 110,
            wonBy: '60af85d8d1fd5c1f4c8c9ef0',
            date: '2025-06-01T14:00:00.000Z',
            status: 'completed',
          },
        },
        MatchInputPayload: {
          type: 'object',
          required: ['name', 'tournament', 'ground', 'teamA', 'teamB', 'date', 'status'],
          properties: {
            name: {
              type: 'string',
            },
            tournament: {
              type: 'string',
            },
            ground: {
              type: 'string',
            },
            teamA: {
              type: 'string',
            },
            teamB: {
              type: 'string',
            },
            teamAscore: {
              type: 'string',
            },
            teamBscore: {
              type: 'string',
            },
            date: {
              type: 'string',
              format: 'date-time',
            },
            status: {
              type: 'string',
              enum: ['scheduled', 'live', 'completed', 'cancelled'],
            },
          },
        },
        Player: {
          type: 'object',
          required: ['name', 'phone', 'email'],
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            phone: { type: 'number' },
            email: { type: 'string' },
          },
          example: {
            _id: '60af8840d1fd5c1f4c8c9ef9',
            name: 'John Doe',
            phone: 9876543210,
            email: 'johndoe@example.com',
          },
        },
        PlayerInputPayload: {
          type: 'object',
          required: ['name', 'phone', 'email'],
          properties: {
            name: { type: 'string' },
            phone: { type: 'number' },
            email: { type: 'string' },
          },
        },
        Team: {
          type: 'object',
          required: ['name', 'location', 'ownerId'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated ID of the team',
            },
            name: {
              type: 'string',
              description: 'Name of the team',
            },
            location: {
              type: 'string',
              description: 'Location of the team',
            },
            ownerId: {
              type: 'string',
              description: 'ObjectId reference to the player who owns the team',
            },
            players: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ObjectId reference to a player in the team',
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
          example: {
            _id: '60af8840d1fd5c1f4c8c9ef3',
            name: 'Madurai makkans',
            location: 'Madurai',
            ownerId: '60af8840d1fd5c1f4c8c9abc',
            players: ['60af8840d1fd5c1f4c8c9e11', '60af8840d1fd5c1f4c8c9e12'],
            createdAt: '2025-05-03T10:00:00.000Z',
            updatedAt: '2025-05-03T12:00:00.000Z',
          },
        },
        TeamInputPayload: {
          type: 'object',
          required: ['name', 'location', 'ownerId'],
          properties: {
            name: {
              type: 'string',
            },
            location: {
              type: 'string',
            },
            ownerId: {
              type: 'string',
            },
            players: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
          example: {
            name: 'Madurai makkans',
            location: 'Madurai',
            ownerId: '60af8840d1fd5c1f4c8c9abc',
            players: ['60af8840d1fd5c1f4c8c9e11', '60af8840d1fd5c1f4c8c9e12'],
          },
        },
        Tournament: {
          type: 'object',
          required: ['name', 'location', 'createdBy', 'startDate', 'endDate'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated ID of the tournament',
            },
            name: {
              type: 'string',
              description: 'Name of the tournament',
            },
            location: {
              type: 'string',
              description: 'Primary location of the tournament',
            },
            createdBy: {
              type: 'string',
              description: 'ObjectId reference to the user who created the tournament',
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              description: 'Start date of the tournament',
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              description: 'End date of the tournament',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
          example: {
            _id: '60af8840d1fd5c1f4c8c9aaa',
            name: 'Ghilli Cup 2025',
            location: 'Coimbatore',
            createdBy: '60af8840d1fd5c1f4c8c9bbb',
            startDate: '2025-06-01T10:00:00.000Z',
            endDate: '2025-06-10T18:00:00.000Z',
            createdAt: '2025-05-01T12:00:00.000Z',
            updatedAt: '2025-05-03T12:00:00.000Z',
          },
        },
        TournamentInputPayload: {
          type: 'object',
          required: ['name', 'location', 'createdBy', 'startDate', 'endDate'],
          properties: {
            name: {
              type: 'string',
            },
            location: {
              type: 'string',
            },
            createdBy: {
              type: 'string',
            },
            startDate: {
              type: 'string',
              format: 'date-time',
            },
            endDate: {
              type: 'string',
              format: 'date-time',
            },
          },
          example: {
            name: 'Ghilli Cup 2025',
            location: 'Coimbatore',
            createdBy: '60af8840d1fd5c1f4c8c9bbb',
            startDate: '2025-06-01T10:00:00.000Z',
            endDate: '2025-06-10T18:00:00.000Z',
          },
        },
        PlayerStats: {
          type: 'object',
          required: ['playerId'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated ID of the player stats document',
            },
            playerId: {
              type: 'string',
              description: 'ObjectId reference to the player',
            },
            matchesPlayed: {
              type: 'number',
              default: 0,
              description: 'Number of matches the player has played',
            },
            raidCount: {
              type: 'number',
              default: 0,
              description: 'Total raids attempted',
            },
            successfulRaids: {
              type: 'number',
              default: 0,
              description: 'Number of successful raids',
            },
            points: {
              type: 'number',
              default: 0,
              description: 'Total points scored',
            },
            bonusPoints: {
              type: 'number',
              default: 0,
              description: 'Bonus points scored',
            },
            raidPoints: {
              type: 'number',
              default: 0,
              description: 'Points from raids',
            },
            tackleCount: {
              type: 'number',
              default: 0,
              description: 'Total tackles attempted',
            },
            tacklePoints: {
              type: 'number',
              default: 0,
              description: 'Points scored from tackles',
            },
            superTackle: {
              type: 'number',
              default: 0,
              description: 'Number of successful super tackles',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
          example: {
            _id: '60af8840d1fd5c1f4c8c9abc',
            playerId: '60af8840d1fd5c1f4c8c9aaa',
            matchesPlayed: 12,
            raidCount: 34,
            successfulRaids: 21,
            points: 85,
            bonusPoints: 10,
            raidPoints: 55,
            tackleCount: 18,
            tacklePoints: 20,
            superTackle: 3,
            createdAt: '2025-05-01T12:00:00.000Z',
            updatedAt: '2025-05-03T12:00:00.000Z',
          },
        },
        PlayerStatsInputPayload: {
          type: 'object',
          required: ['playerId'],
          properties: {
            playerId: {
              type: 'string',
            },
            matchesPlayed: {
              type: 'number',
            },
            raidCount: {
              type: 'number',
            },
            successfulRaids: {
              type: 'number',
            },
            points: {
              type: 'number',
            },
            bonusPoints: {
              type: 'number',
            },
            raidPoints: {
              type: 'number',
            },
            tackleCount: {
              type: 'number',
            },
            tacklePoints: {
              type: 'number',
            },
            superTackle: {
              type: 'number',
            },
          },
          example: {
            playerId: '60af8840d1fd5c1f4c8c9aaa',
            matchesPlayed: 12,
            raidCount: 34,
            successfulRaids: 21,
            points: 85,
            bonusPoints: 10,
            raidPoints: 55,
            tackleCount: 18,
            tacklePoints: 20,
            superTackle: 3,
          },
        },
        TournamentTeam: {
          type: 'object',
          required: ['name', 'location', 'createdBy', 'startDate', 'endDate'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated ID of the TournamentTeam ',
            },
            tournamentId: {
              type: 'string',
              description: 'ID of the tournament this team is participating in teamId',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
          example: {
            _id: '60af8840d1fd5c1f4c8c9aaa',
            name: 'Ghilli Cup 2025',
            location: 'Coimbatore',
            createdBy: '60af8840d1fd5c1f4c8c9bbb',
            startDate: '2025-06-01T10:00:00.000Z',
            endDate: '2025-06-10T18:00:00.000Z',
            createdAt: '2025-05-01T12:00:00.000Z',
            updatedAt: '2025-05-03T12:00:00.000Z',
          },
        },
      },
    },
  },
  apis: ['./src/app/routes/*.ts'],
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerSpec, swaggerUi };
