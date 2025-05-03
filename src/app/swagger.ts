import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ghilli API Documentation',
      version: '1.0.0',
      description: 'API for kabadi tournament',
    },
    servers: [{ url: 'http:localhost:8000/' }],
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
      },
    },
  },
  apis: ['./src/app/routes/*.ts'],
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerSpec, swaggerUi };
