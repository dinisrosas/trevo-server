import { GamesService } from 'src/games/games.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BetsService } from './bets.service';

describe('BetsService', () => {
  const findMany = jest.fn();
  const service = new BetsService(
    { bet: { findMany } } as unknown as PrismaService,
    {} as GamesService,
  );

  beforeEach(() => {
    findMany.mockReset();
    findMany.mockResolvedValue([]);
  });

  describe('findAllActive', () => {
    it('only returns unsettled bets by default', async () => {
      await service.findAllActive({ date: '2026-08-14' });

      expect(findMany).toHaveBeenCalledWith({
        where: {
          award: null,
          game: { isoDate: '2026-08-14' },
        },
        include: { game: true },
      });
    });

    it('does not filter by award when settled bets are included', async () => {
      await service.findAllActive({
        date: '2026-08-14',
        includeSettled: true,
      });

      expect(findMany).toHaveBeenCalledWith({
        where: {
          game: { isoDate: '2026-08-14' },
        },
        include: { game: true },
      });
    });
  });
});
