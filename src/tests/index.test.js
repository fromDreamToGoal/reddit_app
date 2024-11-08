import { calculatePostDate, getRandomInteger, getRandomAvatar } from '../utils/index';


describe('calculatePostDate', () => {
    it('returns "X seconds ago" if the post was created less than a minute ago', () => {
      const now = Math.floor(Date.now() / 1000);
      expect(calculatePostDate(now)).toBe('0 seconds ago');
    });
  
    it('returns "X minutes ago" if the post was created less than an hour ago', () => {
      const thirtyMinutesAgo = Math.floor(Date.now() / 1000) - 30 * 60;
      expect(calculatePostDate(thirtyMinutesAgo)).toBe('30 minutes ago');
    });
  
    it('returns "X hours ago" if the post was created less than a day ago', () => {
      const fiveHoursAgo = Math.floor(Date.now() / 1000) - 5 * 60 * 60;
      expect(calculatePostDate(fiveHoursAgo)).toBe('5 hours ago');
    });
  
    it('returns "X days ago" if the post was created more than a day ago', () => {
      const twoDaysAgo = Math.floor(Date.now() / 1000) - 2 * 24 * 60 * 60;
      expect(calculatePostDate(twoDaysAgo)).toBe('2 days ago');
    });
});

    describe('getRandomInteger', () => {
        it('returns an integer within the specified range', () => {
            const min = 1;
            const max = 10;
            const randomInt = getRandomInteger(min, max);
            expect(randomInt).toBeGreaterThanOrEqual(min);
            expect(randomInt).toBeLessThanOrEqual(max);
        });

        it('returns the same number if min and max are equal', () => {
            const min = 5;
            const max = 5;
            const randomInt = getRandomInteger(min, max);
            expect(randomInt).toBe(min);
        });

        it('returns a number within the range even if min and max are negative', () => {
            const min = -10;
            const max = -1;
            const randomInt = getRandomInteger(min, max);
            expect(randomInt).toBeGreaterThanOrEqual(min);
            expect(randomInt).toBeLessThanOrEqual(max);
        });
    });

    describe('getRandomAvatar', () => {
        it('returns a valid avatar URL from the defaultAvatars array', () => {
            const avatar = getRandomAvatar();
            const defaultAvatars = [
                'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png',
                'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_2.png',
                'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png',
                'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png',
                'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png',
                'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_6.png',
                'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_7.png',
            ];
            expect(defaultAvatars).toContain(avatar);
        });

        it('returns different avatars on subsequent calls', () => {
            const avatar1 = getRandomAvatar();
            const avatar2 = getRandomAvatar();
            // It's possible but unlikely that the same avatar is returned twice
            expect(avatar1).not.toBe(avatar2);
        });
    });

