export interface ICat {
  id: string;
  name: string;
  headline: string;
  description: string;
  images: any[];
}

const INITIAL_STATE: ICat[] = [
  {
    id: 'e6b1f090-d5b1-4572-a538-28a41cc8e960',
    name: 'Bandit',
    headline: 'Frisky kitten looking for a good home.',
    description: `<p>Bandit is a shy kitty who loves to be pet. He likes to be brushed and gives impressive loud purrs. He sleeps on the bed with his foster parents and stretches out and purrs happily and when petted.  He can be quite bold, especially when there are treats to be had.</p>`,
    images: [{
      url: 'https://placekitten.com/80/80'
    }]
  },
  {
    id: '10468d85-6ecb-481b-b955-f565dcd5d3be',
    name: 'Randy',
    description: `<p>Randy came from a feral cat colony as kittens and were soon placed in a home where he was loved and allowed to adjust to indoor life at his own pace. Randy is now in a foster home waiting for their forever home.
        </p>
      <p>The little guy still show signs of nervousness and are skittish but they are also gentle, affectionate and enjoy human companionship.</p>`,
    headline: 'Plays well with others.',
    images: [{
      url: 'https://placekitten.com/90/90'
    }]
  },
  {
    id: 'b014e123-6331-4e73-83bf-1f775e84ce60',
    name: 'Peaches',
    headline: 'Looking for her forever home.',
    description: `<b>Peaches</b> is a gorgeous ginger cat who loves to be pet and will happily curl up next to you on the couch after a long day. While you are busy around the house she will retreat to her favorite shoe box for a nap or just to calmly observe the world around her. Bounce Peache's favorite sponge ball her way and she will show off her quick reflexes as she bats it out of the air. True to her namesake, she's quite vocal so you will always know when she's around.`,
    images: [{
      url: 'https://placekitten.com/105/105'
    }]
  },
  {
    id: '0e1ef1c7-16a8-4003-b0d9-4fd68f390b55',
    name: 'Simon',
    headline: 'Older cat.',
    description: `
        	<p>
Simon is a sweet, trusting FIV+ 3 year old cat with a lot of love to give. Simon loves to cuddle and is very affectionate and social. He also can be chatty, and likes to have a conversation with you. If you meow at him, he will respond to you with a meow of his own.</p>
        `,
    images: [{
      url: 'https://placekitten.com/203/203'
    }]
  },
  {
    id: '7a372cf4-ad2a-4b97-b4f1-94392e5b866b',
    name: 'Stubbs',
    headline: `Don't let his short tail fool you!`,
    description: `Stubbs is a tiny tabby who doesn't let her size stand in his way. He loves to chat and purrs up a storm. He's a perfect combo of cuddly and playful!
Stubbs would love to be adopted into a home where there is another kitty for her to play with.`,
    images: [{
      url: 'https://placekitten.com/204/204'
    }]
  }

];
export const cats = (state: ICat[] = INITIAL_STATE, action) => {
  return state;
};
