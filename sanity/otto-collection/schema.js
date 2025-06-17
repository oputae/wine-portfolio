/**
 * Defines the document schema for a 'wine' in Sanity.
 */
export const wine = {
  name: 'wine',
  title: 'Wine',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Wine Name',
      type: 'string',
      description: 'The full name of the wine (e.g., "Château Margaux 2015").',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'winery',
      title: 'Winery',
      type: 'string',
      description: 'The name of the winery or producer.',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      description: 'A unique URL-friendly identifier for the wine.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'A high-quality photo of the wine bottle.',
      options: {
        hotspot: true, // Enables cropping and positioning of the image
      },
    },
    {
      name: 'isFavorite',
      title: 'Favorite',
      type: 'boolean',
      description: 'Mark this wine as a favorite.',
      initialValue: false,
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'In Cellar', value: 'In Cellar'},
          {title: 'Consumed', value: 'Consumed'},
        ],
        layout: 'radio',
      },
      description: 'The current status of the wine.',
      initialValue: 'In Cellar',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'wineType',
      title: 'Wine Type',
      type: 'string',
      description: 'e.g., Red, White, Rosé, Sparkling, Dessert',
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
      description: 'The geographical region of origin (e.g., "Bordeaux, France").',
    },
    {
      name: 'grapes',
      title: 'Grapes',
      type: 'string',
      description: 'The grape varietals used (e.g., "Cabernet Sauvignon, Merlot").',
    },
    {
      name: 'tastingNotes',
      title: 'Tasting Notes',
      type: 'text',
      description: 'Your personal notes on the aroma, flavor, and finish.',
    },
    {
      name: 'personalStory',
      title: 'Personal Story',
      type: 'text',
      description: 'Any personal story or memory associated with this wine.',
    },
    {
      name: 'coordinates',
      title: 'Winery Coordinates',
      type: 'geopoint',
      description: 'The latitude and longitude of the winery for map placement.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'winery',
      media: 'mainImage',
    },
  },
};