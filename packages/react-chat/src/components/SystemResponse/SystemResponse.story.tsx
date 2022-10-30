import { ComponentMeta, ComponentStory } from '@storybook/react';

import Chat from '@/components/Chat';

import SystemResponse, { MessageProps } from '.';

const CARD_IMAGE = 'https://source.unsplash.com/random/248x150';
const TEXT_MESSAGE: MessageProps = { type: 'text', text: 'Lorem ipsum dolor sit amet consectetur' };
const CARD: MessageProps = {
  type: 'card',
  title: 'Card Message',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
  image: CARD_IMAGE,
};

export default {
  title: 'Components/Chat/SystemResponse',
  component: SystemResponse,
  args: {
    timestamp: Date.now(),
    image: 'https://source.unsplash.com/random/26x26',
    messageDelay: 2000,
  },
  argTypes: {
    timestamp: {
      control: { type: 'date' },
    },
  },
  excludeStories: ['RawTemplate'],
} as ComponentMeta<typeof SystemResponse>;

export const RawTemplate: ComponentStory<typeof SystemResponse> = (args) => <SystemResponse {...args} />;
const Template: ComponentStory<typeof SystemResponse> = (args) => (
  <Chat.Container>
    <Chat.Dialog css={{ padding: '64px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <RawTemplate {...args} />
    </Chat.Dialog>
  </Chat.Container>
);

export const SimpleText = Template.bind({});
SimpleText.args = {
  messages: [{ type: 'text', text: 'Lorem ipsum dolor' }],
};

export const WrappingText = Template.bind({});
WrappingText.args = {
  messages: [{ type: 'text', text: 'consecteturaconsecteturaconsecteturaconsecteturaconsecteturaconsectetura' }],
};

export const MultilineText = Template.bind({});
MultilineText.args = {
  messages: [TEXT_MESSAGE],
};

export const Live = Template.bind({});
Live.args = {
  messages: [TEXT_MESSAGE, TEXT_MESSAGE, TEXT_MESSAGE],
  isLive: true,
};

export const ActionableText = Template.bind({});
ActionableText.args = {
  ...Live.args,
  actions: [{ label: 'Button One' }, { label: 'Button Two' }, { label: 'Button Three' }],
};

export const Image = Template.bind({});
Image.args = {
  messages: [{ type: 'image', url: CARD_IMAGE }],
};

export const Card = Template.bind({});
Card.args = {
  messages: [CARD],
};

export const ActionableCard = Template.bind({});
ActionableCard.args = {
  messages: [
    {
      ...CARD,
      actions: [{ label: 'First Button' }, { label: 'Second Button' }, { label: 'Third Button' }],
    },
  ],
};

export const Carousel = Template.bind({});
Carousel.args = {
  messages: [
    {
      type: 'carousel',
      cards: [
        {
          title: 'First Card',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
          image: CARD_IMAGE,
        },
        {
          title: 'Second Card',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          image: CARD_IMAGE,
          actions: [{ label: 'First Button' }, { label: 'Second Button' }],
        },
        {
          title: 'Third Card',
          description: 'Lorem ipsum dolor sit amet',
          image: CARD_IMAGE,
          actions: [{ label: 'First Button' }, { label: 'Second Button' }, { label: 'Third Button' }],
        },
      ],
    },
  ],
};

export const Multiple = Template.bind({});
Multiple.args = {
  messages: [
    ...(SimpleText.args.messages ?? []),
    ...(WrappingText.args.messages ?? []),
    ...(MultilineText.args.messages ?? []),
    ...(Image.args.messages ?? []),
    ...(Card.args.messages ?? []),
    ...(ActionableCard.args.messages ?? []),
    ...(Carousel.args.messages ?? []),
  ],
};
