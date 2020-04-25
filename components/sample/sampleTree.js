const sampleTree = {
  children: [
    {
      label: '1',
      children: [{
        label: '1-1',
        children: [],
      }, {
        label: '1-2',
        children: [{
          label: '1-2-1',
          children: [{
            label: '1-2-1-1',
            children: [],
          }, {
            label: '1-2-1-2',
            children: [],
          }, {
            label: '1-2-1-3',
            children: [],
          }, {
            label: '1-2-1-4',
            children: [],
          }],
        }],
      },],
    },
    {
      label: '2',
      children: [{
        label: '2-1',
        children: [{
          label: '2-1-1',
          children: [],
        },],
      }, {
        label: '2-2',
        children: [],
      }],
    },
    {
      label: '3',
      children: [{
        label: '3-1',
        children: [{
          label: '3-1-1',
          children: [{
            label: '3-1-1-1',
            children: [{
              label: '3-1-1-1-1',
              children: [],
            },],
          },],
        },],
      },],
    },
    {
      label: '4',
      children: [
        {
          label: '4-1',
          children: [{
            label: '4-1-1',
            children: [],
          }],
        },
        {
          label: '4-2',
          children: [],
        },
        {
          label: '4-3',
          children: [],
        }
      ],
    },
    {
      label: '5',
      children: [
        {
          label: '5-1',
          children: [{
            label: '5-1-1',
            children: [],
          }],
        },
        {
          label: '5-2',
          children: [],
        },
        {
          label: '5-3',
          children: [{
            label: '5-3-1',
            children: [],
          },
          {
            label: '5-3-2',
            children: [],
          }],
        }
      ],
    }
  ],
}

export default sampleTree;