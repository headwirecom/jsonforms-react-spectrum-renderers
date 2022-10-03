export let samples: any = [];

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
            scope: '#/properties/vegetarianOptions/properties/favoriteVegetable',
          },
          {
            type: 'Control',
            scope: '#/properties/vegetarianOptions/properties/otherFavoriteVegetable',
            rule: {
              effect: 'SHOW',
              condition: {
                scope: '#/properties/vegetarianOptions/properties/favoriteVegetable',
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
            enum: ['Tomato', 'Potato', 'Salad', 'Aubergine', 'Cucumber', 'Other'],
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
            scope: '#/properties/vegetarianOptions/properties/favoriteVegetable',
          },
          {
            type: 'Control',
            scope: '#/properties/vegetarianOptions/properties/otherFavoriteVegetable',
            rule: {
              effect: 'SHOW',
              condition: {
                scope: '#/properties/vegetarianOptions/properties/favoriteVegetable',
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
            enum: ['Tomato', 'Potato', 'Salad', 'Aubergine', 'Cucumber', 'Other'],
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
            scope: '#/properties/vegetarianOptions/properties/favoriteVegetable',
          },
          {
            type: 'Control',
            scope: '#/properties/vegetarianOptions/properties/otherFavoriteVegetable',
            rule: {
              effect: 'SHOW',
              condition: {
                scope: '#/properties/vegetarianOptions/properties/favoriteVegetable',
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
            enum: ['Tomato', 'Potato', 'Salad', 'Aubergine', 'Cucumber', 'Other'],
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

samples.push({
  name: 'spectrum-array-modal-test',
  label: 'Array Modal Test',
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/addressOrUsers',
        options: {
          dataAsLabel: 0,
          modal: true,
          oneOfModal: true,
          showSortButtons: true,
          sortButtonDirection: 'Vertical',
          enableDetailedView: true,
          dragAndDrop: false,
        },
      },
    ],
  },
  schema: {
    type: 'object',
    properties: {
      addressOrUsers: {
        type: 'array',
        items: {
          oneOf: [
            {
              type: 'object',
              title: 'Address',
              properties: {
                street_address: {
                  type: 'string',
                },
                componentType: {
                  type: 'string',
                  default: 'Address',
                  const: 'Address',
                },
                city: {
                  type: 'string',
                },
                state: {
                  type: 'string',
                },
                optional: {
                  type: 'string',
                },
                indexOfFittingSchema: {
                  type: 'integer',
                  default: 0,
                },
              },
              required: ['street_address', 'city', 'state', 'optional'],
            },
            {
              type: 'object',
              properties: {
                componentType: {
                  type: 'string',
                  default: 'User',
                  const: 'User',
                },
                name: {
                  type: 'string',
                },
                mail: {
                  type: 'string',
                },
                indexOfFittingSchema: {
                  type: 'number',
                  default: 1,
                },
              },
              required: ['name', 'mail'],
            },
          ],
        },
      },
    },
  },
  data: {
    addressOrUsers: [
      {
        name: '1',
        mail: 'abcs',
        indexOfFittingSchema: 1,
        componentType: 'User',
      },
      {
        street_address: '2',
        city: 'Washington',
        state: 'DC',
        componentType: 'Address',
      },
      {
        name: '3',
        mail: 'asdasas',
        componentType: 'User',
        indexOfFittingSchema: 1,
      },
      {
        componentType: '4',
        indexOfFittingSchema: 1,
        name: 'asd',
        mail: 'asdassd',
      },
      {
        name: '5',
        mail: 'abcs',
        indexOfFittingSchema: 1,
        componentType: 'User',
      },
      {
        street_address: '6',
        city: 'Washington',
        state: 'DC',
        componentType: 'Address',
      },
    ],
  },
});

samples.push({
  name: 'spectrum-richt-text-editor',
  label: 'Rich Text Editor',
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/RichTextEditor',
        label: 'TipTap Editor',
        options: {
          richText: true,
        },
      },
    ],
  },
  schema: {
    type: 'object',
    properties: {
      RichTextEditor: {
        type: 'string',
      },
    },
  },
  data: {
    RichTextEditor: '<p>This is a string</p>',
  },
});

samples.push({
  name: 'spectrum-contentfragmentreferencewithdetail-testarea',
  label: 'ContentFragmentReferenceWithDetail TestArea',
  uischema: {
    type: 'ContentFragmentReferenceWithDetail',
    label: 'My ContentFragmentReferenceWithDetail',
    elements: [
      {
        type: 'VerticalLayout',
        label: 'Name and Birthdate Vertical',
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
        type: 'HorizontalLayout',
        label: 'Name and Birthdate Horizontal',
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
            scope: '#/properties/addressOrUsers',
            options: {
              dataAsLabel: 0,
              modal: true,
              oneOfModal: true,
              showSortButtons: true,
              sortButtonDirection: 'Vertical',
              enableDetailedView: true,
              dragAndDrop: false,
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

      addressOrUsers: {
        type: 'array',
        items: {
          oneOf: [
            {
              type: 'object',
              title: 'Address',
              properties: {
                street_address: {
                  type: 'string',
                },
                componentType: {
                  type: 'string',
                  default: 'Address',
                  const: 'Address',
                },
                city: {
                  type: 'string',
                },
                state: {
                  type: 'string',
                },
                optional: {
                  type: 'string',
                },
                indexOfFittingSchema: {
                  type: 'integer',
                  default: 0,
                },
              },
              required: ['street_address', 'city', 'state', 'optional'],
            },
            {
              type: 'object',
              properties: {
                componentType: {
                  type: 'string',
                  default: 'User',
                  const: 'User',
                },
                name: {
                  type: 'string',
                },
                mail: {
                  type: 'string',
                },
                indexOfFittingSchema: {
                  type: 'number',
                  default: 1,
                },
              },
              required: ['name', 'mail'],
            },
          ],
        },
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
      drivingSkill: 7,
    },
    postalCode: '12345',
  },
});

samples.push({
  name: 'spectrum-cfr-testarea',
  label: 'ContentFragmentReferenceWithDetail TestArea',
  uischema: {
    type: 'ContentFragmentReferenceWithDetail',
    label: 'Page Metadata Component',
    elements: [
      {
        type: 'VerticalLayout',
        label: 'Page Metadata',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/_path',
            rule: {
              effect: 'HIDE',
              condition: {},
            },
          },
          {
            type: 'Control',
            scope: '#/properties/_model/properties/_path',
            rule: {
              effect: 'HIDE',
              condition: {},
            },
          },
          {
            type: 'Control',
            scope: '#/properties/_model/properties/title',
            rule: {
              effect: 'HIDE',
              condition: {},
            },
          },
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/seoTitle',
                label: 'SEO Title',
              },
              {
                type: 'Control',
                scope: '#/properties/seoType',
                label: 'SEO Type',
                options: {
                  autocomplete: false,
                },
              },
            ],
          },
          {
            type: 'Control',
            label: 'SEO Description',
            scope: '#/properties/seoDescription/properties/html',
            options: {
              richText: true,
            },
          },
          {
            type: 'Control',
            scope: '#/properties/seoImage/properties/_path',
            label: 'SEO Image',
            options: {
              assetPicker: {
                icon: true,
                buttonText: '',
                send: {
                  message: {
                    type: 'assetPicker',
                    data: 'TestMessage',
                    targetOrigin: '*',
                  },
                },
                receive: {
                  message: 'string',
                  targetOrigin: 'string',
                  type: 'assetPicker',
                  data: 'Test',
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
    title: 'Page Metadata Component',
    properties: {
      _path: {
        type: 'string',
        default: '/content/dam/golfdigest-schools/content-fragments/marketing/test-folder/CFNAME',
      },
      _model: {
        type: 'object',
        readOnly: true,
        properties: {
          _path: {
            type: 'string',
            default: '/conf/golfdigest-schools/settings/dam/cfm/models/page-metadata-component',
            const: '/conf/golfdigest-schools/settings/dam/cfm/models/page-metadata-component',
          },
          title: {
            type: 'string',
            default: 'Page Metadata Component',
            const: 'Page Metadata Component',
          },
        },
      },
      _variations: {
        type: 'array',
        items: {
          name: {
            type: 'string',
          },
          value: {
            type: 'string',
          },
        },
      },
      _metadata: {
        type: 'object',
        booleanArrayMetadata: {
          type: 'array',
          items: {
            name: {
              type: 'string',
            },
            value: {
              type: 'string',
            },
          },
        },
        booleanMetadata: {
          type: 'array',
          items: {
            name: {
              type: 'string',
            },
            value: {
              type: 'string',
            },
          },
        },
        calendarArrayMetadata: {
          type: 'array',
          items: {
            name: {
              type: 'string',
            },
            value: {
              type: 'string',
            },
          },
        },
        calendarMetadata: {
          type: 'array',
          items: {
            name: {
              type: 'string',
            },
            value: {
              type: 'string',
            },
          },
        },
        floatArrayMetadata: {
          type: 'array',
          items: {
            name: {
              type: 'string',
            },
            value: {
              type: 'string',
            },
          },
        },
        floatMetadata: {
          type: 'array',
          items: {
            name: {
              type: 'string',
            },
            value: {
              type: 'string',
            },
          },
        },
        intArrayMetadata: {
          type: 'array',
          items: {
            name: {
              type: 'string',
            },
            value: {
              type: 'string',
            },
          },
        },
        intMetadata: {
          type: 'array',
          items: {
            name: {
              type: 'string',
            },
            value: {
              type: 'string',
            },
          },
        },
        stringArrayMetadata: {
          type: 'array',
          items: {
            name: {
              type: 'string',
            },
            value: {
              type: 'string',
            },
          },
        },
        stringMetadata: {
          type: 'array',
          items: {
            name: {
              type: 'string',
            },
            value: {
              type: 'string',
            },
          },
        },
      },
      seoTitle: {
        title: 'SEO Title',
        type: 'string',
      },
      seoDescription: {
        type: 'object',
        html: {
          title: 'HTML',
          type: 'string',
        },
        json: {
          title: 'JSON',
          type: 'string',
        },
        plaintext: {
          title: 'Plain Text',
          type: 'string',
        },
        markdown: {
          title: 'Markdown',
          type: 'string',
        },
      },
      seoImage: {
        title: 'SEO Image',
        pattern: 'uri-reference',
        type: 'object',
        properties: {
          type: {
            type: 'string',
          },
          mimeType: {
            type: 'string',
          },
          height: {
            type: 'number',
          },
          width: {
            type: 'number',
          },
          _authorUrl: {
            type: 'string',
          },
          _path: {
            type: 'string',
          },
          _publishUrl: {
            type: 'string',
          },
        },
      },
      seoType: {
        title: 'SEO Type',
        oneOf: [
          {
            title: 'Article',
            const: 'article',
          },
          {
            title: 'Website',
            const: 'website',
          },
        ],
        type: 'string',
      },
    },
  },
  data: {
    _path: '/content/dam/golfdigest-schools/content-fragments/marketing/test-folder/CFNAME',
    _model: {
      _path: '/conf/golfdigest-schools/settings/dam/cfm/models/page-metadata-component',
      title: 'Page Metadata Component',
    },
    c: '',
    seoTitle: '',
    seoImage: {
      _path: '',
    },
    seoDescription: {
      html: '<p></p>',
    },
  },
});

samples.push({
  name: 'spectrum-image-preview',
  label: 'Image Preview',
  uischema: {
    type: 'MediaPreviewLayout',
    options: {
      dataAsImage: 'image',
      dataAsLabel: 'image',
    },
    elements: [
      {
        type: 'Control',
        scope: '#/properties/image',
        options: {
          mediaPreview: true,
          description: false,
          gap: 'size-100',
          alignItems: 'center',
          flex: 'column',
          height: 'auto',
          width: 'auto',
        },
      },
    ],
  },
  schema: {
    type: 'object',
    properties: {
      image: {
        type: 'string',
      },
    },
  },
  data: { image: 'https://placebear.com/400/400' },
});
