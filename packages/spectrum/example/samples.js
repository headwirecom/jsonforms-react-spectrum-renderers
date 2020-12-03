var samples = [];

samples.push({
  name: 'spectrum-array',
  label: 'Array',
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
  label: 'Categorization',
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
  label: 'Categorization (stepper variant)',
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
  label: 'Categorization (stepper variant w/nav)',
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

samples.push({
  name: 'spectrum-custom-controls',
  label: 'Custom Controls',
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/name',
      },
      {
        type: 'Control',
        label: false,
        scope: '#/properties/done',
      },
      {
        type: 'Control',
        scope: '#/properties/description',
        options: {
          multi: true,
        },
      },
      {
        type: 'Control',
        scope: '#/properties/dueDate',
      },
      {
        type: 'Control',
        scope: '#/properties/rating',
      },
    ],
  },
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
      description: {
        type: 'string',
      },
      done: {
        type: 'boolean',
      },
      dueDate: {
        type: 'string',
        format: 'date',
      },
      rating: {
        type: 'integer',
        maximum: 5,
      },
    },
    required: ['name'],
  },
  data: {
    name: 'Send email to Adrian',
    description: 'Confirm if you have passed the subject\nHereby ...',
    done: true,
    rating: 3,
  },
});

samples.push({
  name: 'spectrum-generate-ui-schema',
  label: 'Generate UI Schema',
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      vegetarian: {
        type: 'boolean',
      },
      birthDate: {
        type: 'string',
      },
      personalData: {
        type: 'object',
        properties: {
          age: {
            type: 'integer',
          },
        },
        additionalProperties: true,
        required: ['age'],
      },
      postalCode: {
        type: 'string',
      },
    },
    additionalProperties: true,
    required: ['name', 'vegetarian', 'birthDate', 'personalData', 'postalCode'],
  },
  data: {
    name: 'John Doe',
    vegetarian: false,
    birthDate: '1985-06-02',
    personalData: {
      age: 34,
    },
    postalCode: '12345',
  },
});

samples.push({
  name: 'spectrum-generate-both-schemata',
  label: 'Generate both schemata',
  data: {
    name: 'John Doe',
    vegetarian: false,
    birthDate: '1985-06-02',
    personalData: {
      age: 34,
    },
    postalCode: '12345',
  },
});

samples.push({
  name: 'spectrum-horizontal-layout',
  label: 'Horizontal Layout',
  uischema: {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Name',
        scope: '#/properties/name',
      },
      {
        type: 'Control',
        label: 'Birth Date',
        scope: '#/properties/birthDate',
      },
    ],
  },
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 3,
        description: 'Please enter your name',
      },
      vegetarian: {
        type: 'boolean',
      },
      birthDate: {
        type: 'string',
        format: 'date',
      },
      nationality: {
        type: 'string',
        enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
      },
      personalData: {
        type: 'object',
        properties: {
          age: {
            type: 'integer',
            description: 'Please enter your age.',
          },
          height: {
            type: 'number',
          },
          drivingSkill: {
            type: 'number',
            maximum: 10,
            minimum: 1,
            default: 7,
          },
        },
        required: ['age', 'height'],
      },
      occupation: {
        type: 'string',
      },
      postalCode: {
        type: 'string',
        maxLength: 5,
      },
    },
    required: ['occupation', 'nationality'],
  },
  data: {
    name: 'John Doe',
    vegetarian: false,
    birthDate: '1985-06-02',
    personalData: {
      age: 34,
    },
    postalCode: '12345',
  },
});

samples.push({
  name: 'spectrum-vertical-layout',
  label: 'Vertical Layout',
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Name',
        scope: '#/properties/name',
      },
      {
        type: 'Control',
        label: 'Birth Date',
        scope: '#/properties/birthDate',
      },
    ],
  },
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 3,
        description: 'Please enter your name',
      },
      vegetarian: {
        type: 'boolean',
      },
      birthDate: {
        type: 'string',
        format: 'date',
      },
      nationality: {
        type: 'string',
        enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
      },
      personalData: {
        type: 'object',
        properties: {
          age: {
            type: 'integer',
            description: 'Please enter your age.',
          },
          height: {
            type: 'number',
          },
          drivingSkill: {
            type: 'number',
            maximum: 10,
            minimum: 1,
            default: 7,
          },
        },
        required: ['age', 'height'],
      },
      occupation: {
        type: 'string',
      },
      postalCode: {
        type: 'string',
        maxLength: 5,
      },
    },
    required: ['occupation', 'nationality'],
  },
  data: {
    name: 'John Doe',
    vegetarian: false,
    birthDate: '1985-06-02',
    personalData: {
      age: 34,
    },
    postalCode: '12345',
  },
});

samples.push({
  name: 'spectrum-group-layout',
  label: 'Group',
  uischema: {
    type: 'Group',
    label: 'My Group',
    elements: [
      {
        type: 'Control',
        label: 'Name',
        scope: '#/properties/name',
      },
      {
        type: 'Control',
        label: 'Birth Date',
        scope: '#/properties/birthDate',
      },
    ],
  },
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 3,
        description: 'Please enter your name',
      },
      vegetarian: {
        type: 'boolean',
      },
      birthDate: {
        type: 'string',
        format: 'date',
      },
      nationality: {
        type: 'string',
        enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
      },
      personalData: {
        type: 'object',
        properties: {
          age: {
            type: 'integer',
            description: 'Please enter your age.',
          },
          height: {
            type: 'number',
          },
          drivingSkill: {
            type: 'number',
            maximum: 10,
            minimum: 1,
            default: 7,
          },
        },
        required: ['age', 'height'],
      },
      occupation: {
        type: 'string',
      },
      postalCode: {
        type: 'string',
        maxLength: 5,
      },
    },
    required: ['occupation', 'nationality'],
  },
  data: {
    name: 'John Doe',
    vegetarian: false,
    birthDate: '1985-06-02',
    personalData: {
      age: 34,
    },
    postalCode: '12345',
  },
});

samples.push({
  name: 'spectrum-nested-layouts',
  label: 'Nested Layouts',
  uischema: {
    type: 'Group',
    label: 'My Group',
    elements: [
      {
        type: 'HorizontalLayout',
        elements: [
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'Control',
                label: 'Name',
                scope: '#/properties/name',
              },
              {
                type: 'Control',
                label: 'Birth Date',
                scope: '#/properties/birthDate',
              },
            ],
          },
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'Control',
                label: 'Name',
                scope: '#/properties/name',
              },
              {
                type: 'Control',
                label: 'Birth Date',
                scope: '#/properties/birthDate',
              },
            ],
          },
        ],
      },
    ],
  },
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 3,
        description: 'Please enter your name',
      },
      vegetarian: {
        type: 'boolean',
      },
      birthDate: {
        type: 'string',
        format: 'date',
      },
      nationality: {
        type: 'string',
        enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
      },
      personalData: {
        type: 'object',
        properties: {
          age: {
            type: 'integer',
            description: 'Please enter your age.',
          },
          height: {
            type: 'number',
          },
          drivingSkill: {
            type: 'number',
            maximum: 10,
            minimum: 1,
            default: 7,
          },
        },
        required: ['age', 'height'],
      },
      occupation: {
        type: 'string',
      },
      postalCode: {
        type: 'string',
        maxLength: 5,
      },
    },
    required: ['occupation', 'nationality'],
  },
  data: {
    name: 'John Doe',
    vegetarian: false,
    birthDate: '1985-06-02',
    personalData: {
      age: 34,
    },
    postalCode: '12345',
  },
});

samples.push({
  name: 'spectrum-person',
  label: 'Person',
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'HorizontalLayout',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/name',
          },
          {
            type: 'Control',
            scope: '#/properties/personalData/properties/age',
          },
          {
            type: 'Control',
            scope: '#/properties/birthDate',
          },
        ],
      },
      {
        type: 'Label',
        text: 'Additional Information',
      },
      {
        type: 'HorizontalLayout',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/personalData/properties/height',
          },
          {
            type: 'Control',
            scope: '#/properties/nationality',
          },
          {
            type: 'Control',
            scope: '#/properties/occupation',
            suggestion: [
              'Accountant',
              'Engineer',
              'Freelancer',
              'Journalism',
              'Physician',
              'Student',
              'Teacher',
              'Other',
            ],
          },
        ],
      },
    ],
  },
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 3,
        description: 'Please enter your name',
      },
      vegetarian: {
        type: 'boolean',
      },
      birthDate: {
        type: 'string',
        format: 'date',
      },
      nationality: {
        type: 'string',
        enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
      },
      personalData: {
        type: 'object',
        properties: {
          age: {
            type: 'integer',
            description: 'Please enter your age.',
          },
          height: {
            type: 'number',
          },
          drivingSkill: {
            type: 'number',
            maximum: 10,
            minimum: 1,
            default: 7,
          },
        },
        required: ['age', 'height'],
      },
      occupation: {
        type: 'string',
      },
      postalCode: {
        type: 'string',
        maxLength: 5,
      },
    },
    required: ['occupation', 'nationality'],
  },
  data: {
    name: 'John Doe',
    vegetarian: false,
    birthDate: '1985-06-02',
    personalData: {
      age: 34,
    },
    postalCode: '12345',
  },
});

samples.push({
  name: 'spectrum-rule',
  label: 'Rule',
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Name',
        scope: '#/properties/name',
      },
      {
        type: 'Group',
        elements: [
          {
            type: 'Control',
            label: 'Is Dead?',
            scope: '#/properties/dead',
          },
          {
            type: 'Control',
            label: 'Kind of dead',
            scope: '#/properties/kindOfDead',
            rule: {
              effect: 'ENABLE',
              condition: {
                scope: '#/properties/dead',
                schema: {
                  const: true,
                },
              },
            },
          },
        ],
      },
      {
        type: 'Group',
        elements: [
          {
            type: 'Control',
            label: 'Eats vegetables?',
            scope: '#/properties/vegetables',
          },
          {
            type: 'Control',
            label: 'Kind of vegetables',
            scope: '#/properties/kindOfVegetables',
            rule: {
              effect: 'HIDE',
              condition: {
                scope: '#/properties/vegetables',
                schema: {
                  const: false,
                },
              },
            },
          },
        ],
      },
    ],
  },
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      dead: {
        type: 'boolean',
      },
      kindOfDead: {
        type: 'string',
        enum: ['Zombie', 'Vampire', 'Ghoul'],
      },
      vegetables: {
        type: 'boolean',
      },
      kindOfVegetables: {
        type: 'string',
        enum: ['All', 'Some', 'Only potatoes'],
      },
    },
  },
  data: {
    name: 'John Doe',
    dead: false,
    vegetables: false,
  },
});
