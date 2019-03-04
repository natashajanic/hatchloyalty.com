import { IRelease, IBlogPost, IResourcePost, ITeamMember } from '.'

export const mockBlogPost: IBlogPost = {
  excerpt: 'This is the excerpt for a blog post.',
  fields: {
    slug: '/2019-02-25-test-blog-post/',
  },
  frontmatter: {
    author: 'John Doe',
    date: 'February 25, 2019',
    featuredImage: {
      childImageSharp: {
        fluid: {
          aspectRatio: 1,
          src: 'test/imgs/test-blog-post.png',
          srcSet: '',
          sizes: '',
        },
      },
    },
    tags: ['Test', 'Press Release'],
    title: 'Test Blog Post',
  },
  html: '<div>Test blog post body content.</div>',
}

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

export const mockResourcePost: IResourcePost = {
  excerpt: 'This is the excerpt for a resource post.',
  fields: {
    slug: '/test-resource-post/',
  },
  frontmatter: {
    title: 'Test Resource Post',
  },
  html: '<div>Test resource post body content.</div>',
}

export const mockTeamMember: ITeamMember = {
  headshot: {
    childImageSharp: {
      fluid: {
        aspectRatio: 1,
        src: 'test/imgs/john-doe.png',
        srcSet: '',
        sizes: '',
      },
    },
  },
  name: 'John Doe',
  position: 'CEO',
}
