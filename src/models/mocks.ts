import { IRelease } from '.'

export const mockRelease: IRelease = {
  changes: [
    { component: 'Test', description: 'Test Change 1' },
    {
      component: 'Test HQ',
      description: 'Test Change 2',
      link: 'https://developer.hatchloyalty.com/test/change-2',
    },
  ],
  date: 'January 2019',
  name: 'Test Release 2019.01',
}
