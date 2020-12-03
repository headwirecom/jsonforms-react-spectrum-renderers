var samples = [];

samples.push({
  name: 'spectrum-array',
  label: 'array',
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/comments',
      },
    ],
  },
  schema: {
    type: 'object',
    properties: {
      comments: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            date: {
              type: 'string',
              format: 'date',
            },
            message: {
              type: 'string',
              maxLength: 5,
            },
            enum: {
              type: 'string',
              const: 'foo',
            },
          },
        },
      },
    },
  },
  data: {
    comments: [
      {
        date: '2001-09-11',
        message: 'This is an example message',
      },
      {
        date: '2020-12-02',
        message: 'Get ready for booohay',
      },
    ],
  },
});

samples.push({
  name: 'spectrum-categorization-1',
  label: 'categorization-1',
  uischema: {
    type: 'Categorization',
    elements: [
      {
        type: 'Category',
        label: 'Basic Information',
        elements: [
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/firstName',
              },
              {
                type: 'Control',
                scope: '#/properties/secondName',
              },
            ],
          },
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/birthDate',
              },
              {
                type: 'Control',
                scope: '#/properties/nationality',
              },
            ],
          },
          {
            type: 'Control',
            scope: '#/properties/provideAddress',
          },
          {
            type: 'Control',
            scope: '#/properties/vegetarian',
          },
        ],
      },
      {
        type: 'Category',
        label: 'Address',
        elements: [
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/address/properties/street',
              },
              {
                type: 'Control',
                scope: '#/properties/address/properties/streetNumber',
              },
            ],
          },
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/address/properties/city',
              },
              {
                type: 'Control',
                scope: '#/properties/address/properties/postalCode',
              },
            ],
          },
        ],
        rule: {
          effect: 'SHOW',
          condition: {
            scope: '#/properties/provideAddress',
            schema: {
              const: true,
            },
          },
        },
      },
      {
        type: 'Category',
        label: 'Additional',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/vegetarianOptions/properties/vegan',
          },
          {
            type: 'Control',
            scope:
              '#/properties/vegetarianOptions/properties/favoriteVegetable',
          },
          {
            type: 'Control',
            scope:
              '#/properties/vegetarianOptions/properties/otherFavoriteVegetable',
            rule: {
              effect: 'SHOW',
              condition: {
                scope:
                  '#/properties/vegetarianOptions/properties/favoriteVegetable',
                schema: {
                  const: 'Other',
                },
              },
            },
          },
        ],
        rule: {
          effect: 'SHOW',
          condition: {
            scope: '#/properties/vegetarian',
            schema: {
              const: true,
            },
          },
        },
      },
    ],
  },
  schema: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        minLength: 3,
        description: 'Please enter your first name',
      },
      secondName: {
        type: 'string',
        minLength: 3,
        description: 'Please enter your second name',
      },
      vegetarian: {
        type: 'boolean',
      },
      birthDate: {
        type: 'string',
        format: 'date',
        description: 'Please enter your birth date.',
      },
      nationality: {
        type: 'string',
        enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
      },
      provideAddress: {
        type: 'boolean',
      },
      address: {
        type: 'object',
        properties: {
          street: {
            type: 'string',
          },
          streetNumber: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
          postalCode: {
            type: 'string',
            maxLength: 5,
          },
        },
      },
      vegetarianOptions: {
        type: 'object',
        properties: {
          vegan: {
            type: 'boolean',
          },
          favoriteVegetable: {
            type: 'string',
            enum: [
              'Tomato',
              'Potato',
              'Salad',
              'Aubergine',
              'Cucumber',
              'Other',
            ],
          },
          otherFavoriteVegetable: {
            type: 'string',
          },
        },
      },
    },
  },
  data: {
    provideAddress: true,
    vegetarian: false,
  },
});

samples.push({
  name: 'spectrum-categorization-stepper',
  label: 'categorization-stepper',
  uischema: {
    type: 'Categorization',
    elements: [
      {
        type: 'Category',
        label: 'Basic Information',
        elements: [
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/firstName',
              },
              {
                type: 'Control',
                scope: '#/properties/secondName',
              },
            ],
          },
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/birthDate',
              },
              {
                type: 'Control',
                scope: '#/properties/nationality',
              },
            ],
          },
          {
            type: 'Control',
            scope: '#/properties/provideAddress',
          },
          {
            type: 'Control',
            scope: '#/properties/vegetarian',
          },
        ],
      },
      {
        type: 'Category',
        label: 'Address',
        elements: [
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/address/properties/street',
              },
              {
                type: 'Control',
                scope: '#/properties/address/properties/streetNumber',
              },
            ],
          },
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/address/properties/city',
              },
              {
                type: 'Control',
                scope: '#/properties/address/properties/postalCode',
              },
            ],
          },
        ],
        rule: {
          effect: 'SHOW',
          condition: {
            scope: '#/properties/provideAddress',
            schema: {
              const: true,
            },
          },
        },
      },
      {
        type: 'Category',
        label: 'Additional',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/vegetarianOptions/properties/vegan',
          },
          {
            type: 'Control',
            scope:
              '#/properties/vegetarianOptions/properties/favoriteVegetable',
          },
          {
            type: 'Control',
            scope:
              '#/properties/vegetarianOptions/properties/otherFavoriteVegetable',
            rule: {
              effect: 'SHOW',
              condition: {
                scope:
                  '#/properties/vegetarianOptions/properties/favoriteVegetable',
                schema: {
                  const: 'Other',
                },
              },
            },
          },
        ],
        rule: {
          effect: 'SHOW',
          condition: {
            scope: '#/properties/vegetarian',
            schema: {
              const: true,
            },
          },
        },
      },
    ],
    options: {
      variant: 'stepper',
    },
  },
  schema: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        minLength: 3,
        description: 'Please enter your first name',
      },
      secondName: {
        type: 'string',
        minLength: 3,
        description: 'Please enter your second name',
      },
      vegetarian: {
        type: 'boolean',
      },
      birthDate: {
        type: 'string',
        format: 'date',
        description: 'Please enter your birth date.',
      },
      nationality: {
        type: 'string',
        enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
      },
      provideAddress: {
        type: 'boolean',
      },
      address: {
        type: 'object',
        properties: {
          street: {
            type: 'string',
          },
          streetNumber: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
          postalCode: {
            type: 'string',
            maxLength: 5,
          },
        },
      },
      vegetarianOptions: {
        type: 'object',
        properties: {
          vegan: {
            type: 'boolean',
          },
          favoriteVegetable: {
            type: 'string',
            enum: [
              'Tomato',
              'Potato',
              'Salad',
              'Aubergine',
              'Cucumber',
              'Other',
            ],
          },
          otherFavoriteVegetable: {
            type: 'string',
          },
        },
      },
    },
  },
  data: {
    provideAddress: true,
    vegetarian: false,
  },
});

samples.push({
  name: 'spectrum-categorization-stepper-buttons',
  label: 'categorization-stepper-buttons',
  uischema: {
    type: 'Categorization',
    elements: [
      {
        type: 'Category',
        label: 'Basic Information',
        elements: [
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/firstName',
              },
              {
                type: 'Control',
                scope: '#/properties/secondName',
              },
            ],
          },
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/birthDate',
              },
              {
                type: 'Control',
                scope: '#/properties/nationality',
              },
            ],
          },
          {
            type: 'Control',
            scope: '#/properties/provideAddress',
          },
          {
            type: 'Control',
            scope: '#/properties/vegetarian',
          },
        ],
      },
      {
        type: 'Category',
        label: 'Address',
        elements: [
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/address/properties/street',
              },
              {
                type: 'Control',
                scope: '#/properties/address/properties/streetNumber',
              },
            ],
          },
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/address/properties/city',
              },
              {
                type: 'Control',
                scope: '#/properties/address/properties/postalCode',
              },
            ],
          },
        ],
        rule: {
          effect: 'SHOW',
          condition: {
            scope: '#/properties/provideAddress',
            schema: {
              const: true,
            },
          },
        },
      },
      {
        type: 'Category',
        label: 'Additional',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/vegetarianOptions/properties/vegan',
          },
          {
            type: 'Control',
            scope:
              '#/properties/vegetarianOptions/properties/favoriteVegetable',
          },
          {
            type: 'Control',
            scope:
              '#/properties/vegetarianOptions/properties/otherFavoriteVegetable',
            rule: {
              effect: 'SHOW',
              condition: {
                scope:
                  '#/properties/vegetarianOptions/properties/favoriteVegetable',
                schema: {
                  const: 'Other',
                },
              },
            },
          },
        ],
        rule: {
          effect: 'SHOW',
          condition: {
            scope: '#/properties/vegetarian',
            schema: {
              const: true,
            },
          },
        },
      },
    ],
    options: {
      variant: 'stepper',
      showNavButtons: true,
    },
  },
  schema: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        minLength: 3,
        description: 'Please enter your first name',
      },
      secondName: {
        type: 'string',
        minLength: 3,
        description: 'Please enter your second name',
      },
      vegetarian: {
        type: 'boolean',
      },
      birthDate: {
        type: 'string',
        format: 'date',
        description: 'Please enter your birth date.',
      },
      nationality: {
        type: 'string',
        enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
      },
      provideAddress: {
        type: 'boolean',
      },
      address: {
        type: 'object',
        properties: {
          street: {
            type: 'string',
          },
          streetNumber: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
          postalCode: {
            type: 'string',
            maxLength: 5,
          },
        },
      },
      vegetarianOptions: {
        type: 'object',
        properties: {
          vegan: {
            type: 'boolean',
          },
          favoriteVegetable: {
            type: 'string',
            enum: [
              'Tomato',
              'Potato',
              'Salad',
              'Aubergine',
              'Cucumber',
              'Other',
            ],
          },
          otherFavoriteVegetable: {
            type: 'string',
          },
        },
      },
    },
  },
  data: {
    provideAddress: true,
    vegetarian: false,
  },
});

// samples.push({
//   name: 'spectrum-categorization-stepper',
//   label: 'categorization-stepper',
//   uischema: {
//   },
//   schema: {
//   },
//   data: {
//   },
// });
