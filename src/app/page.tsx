'use client';
import { motion, MotionProps } from 'motion/react';
import { cn } from '@/lib/utils';
import { Gridlines } from '@/components/gridlines/grid-lines';

type Mode = 'home' | 'playground';

export default function Home() {
  const modes = ['home', 'playground'] satisfies Mode[];
  const [mode, setMode] = useState<Mode>('home');
  let content = null;
  switch (mode) {
    case 'playground':
      content = <Playground />;
      break;
    case 'home':
      content = <Page />;
      break;
  }

  return (
    <div className={'relative'}>
      <div className={'fixed top-0 right-0 z-100 grid grid-flow-col gap-2 p-2'}>
        {modes.map((mode, idx) => (
          <FlatButton
            key={idx}
            onClick={() => {
              setMode(mode);
            }}
          >
            {mode.slice(0, 1).toUpperCase().concat(mode.slice(1))}
          </FlatButton>
        ))}
      </div>
      {content}
    </div>
  );
}

import floatingCardStyles from './floating-card.module.css';
const FloatingCard = (props: { className?: string }) => {
  const MONTHLY_CLUB_CARD_SRC = '/assets/monthly-club-card.png';
  return (
    <div>
      <img
        src={MONTHLY_CLUB_CARD_SRC}
        className={cn(floatingCardStyles['card'], props.className)}
      />
    </div>
  );
};

const Playground = () => {
  return (
    <div className={'flex h-screen items-center justify-stretch px-8'}>
      <NavBar />
    </div>
  );
};

import featuresStyles from './features.module.css';
const Polaroids = () => {
  const images = [
    '/assets/work-example-3.png',
    '/assets/work-example-2.png',
    '/assets/work-example-1.png',
  ];
  const rotationPerIdx = 10;
  return (
    <div
      className={cn(
        'group -rotate-[var(--rotation)] h-[70%] relative',
        featuresStyles['polaroids-container'],
      )}
      style={{ '--rotation': `${rotationPerIdx}deg` } as React.CSSProperties}
    >
      {images.map((image, idx) => (
        <Polaroid
          className={cn(
            `rotate-[var(--rotation)] group-hover:rotate-[var(--hover-rotation)] transition-all ease-out duration-600`,
            featuresStyles['polaroid'],
          )}
          style={
            {
              '--rotation': `${idx * rotationPerIdx}deg`,
              '--hover-rotation': `${idx * 10 + (idx + 1 - Math.ceil(images.length / 2)) * 10}deg`,
            } as React.CSSProperties
          }
          key={idx}
        >
          <img src={image} />
        </Polaroid>
      ))}
    </div>
  );
};

// const LogoContainer = () => {
//   return (
//     <div className={'section'}>
//       <div className={'outer-container'}>
//         <div className={'inner-container'}>
//           <Logo />
//         </div>
//       </div>
//     </div>
//   );
// };

function Page() {
  return (
    <div className={''}>
      <Hero />
      <Vision className={'pt-24 pb-12'} />
      <Features />
      <SocialProof />
      <Overview className={'py-14'} />
      <Benefits />
      <PressMentions />
      <CaseStudies className={'pt-20'} />
      <FeatureList />
      <SocialProof />
      <Pricing className={'pt-16 pb-20'} />
      <FAQ />
      <Book className={''} />
    </div>
  );
}

const Hero = () => {
  const HERO_HEADER_COPY = (
    <h1 className={'pb-4 font-medium'}>
      Design <br className={'lg:block hidden'} />
      subscriptions <br className={'lg:block hidden'} />
      for <i className={'font-serif'}>everyone</i>
    </h1>
  );

  const HERO_SUBHEADER_COPY = (
    <p className={'text-xl pb-10 text-dark-gray'}>Pause or cancel anytime.</p>
  );
  return (
    <section className={'section'}>
      <div className={'outer-container'}>
        <div className={'inner-container'}>
          <div
            className={
              'flex flex-col lg:flex-row [--top-padding:40px] lg:gap-8'
            }
          >
            <div className={'w-full'}>
              <div
                className={
                  'flex items-center pt-[var(--top-padding)] pb-16 justify-between lg:items-start'
                }
              >
                <Logo className={''} />
                <NavBar className={'max-sm:hidden'} />
              </div>
              <div className={'lg:mr-30 flex-1'}>
                {HERO_HEADER_COPY}
                {HERO_SUBHEADER_COPY}
              </div>
              <JoinCard className={'lg:hidden'} />
            </div>
            <JoinCard
              className={'max-lg:hidden mt-[var(--top-padding)] min-w-fit'}
            />
          </div>
        </div>
        <Gridlines />
      </div>
    </section>
  );
};

const NavBar = (props: { className?: string }) => {
  const lenis = useLenis();
  const Links: {
    name: string;
    iconSrc?: string;
    relUrl: string;
    buttonType: 'flat' | 'skeu';
    className?: string;
  }[] = [
    {
      name: 'login',
      relUrl: '/login',
      buttonType: 'flat',
    },
    {
      name: 'Book a call',
      relUrl: '#book',
      iconSrc: '/assets/phone.svg',
      buttonType: 'flat',
    },
    {
      name: 'See pricing',
      relUrl: '#pricing',
      buttonType: 'skeu',
      className: 'px-5',
    },
  ];

  return (
    <div className={cn('flex gap-1 font-medium', props.className)}>
      {Links.map((link, idx) => {
        const label = link.name
          .slice(0, 1)
          .toUpperCase()
          .concat(link.name.slice(1));

        const Button = link.buttonType == 'flat' ? FlatButton : SkeuButton;

        return (
          <Button
            className={cn('flex items-center gap-1.5', link.className)}
            key={idx}
            onClick={() => {
              lenis?.scrollTo(link.relUrl);
            }}
          >
            {link?.iconSrc && <img src={link?.iconSrc} className={'h-[1em]'} />}
            <a href={link.relUrl} className={''}>
              {label}
            </a>
          </Button>
        );
      })}
    </div>
  );
};

interface Card {
  title: string;
  subtitle: string;
  backgroundSrc: string;
  content: ReactNode;
}

import featureCardStyles from './feature-card-styles.module.css';

const Features = () => {
  const cards: Card[] = [
    {
      title: 'Subscribe',
      subtitle: "Subscribe to a plan & request as many designs as you'd like",
      backgroundSrc: '/assets/card-1-bg.jpg',
      content: (
        <img
          className={
            'absolute top-[13px] left-0 translate-x-1/18 min-w-[540px]'
          }
          src='/assets/card-1-image.svg'
        ></img>
      ),
    },
    {
      title: 'Request',
      subtitle: "Request whatever you'd like, from mobile apps to logos.",
      backgroundSrc: '/assets/card-2-bg.jpg',
      content: <FeatureMarquees />,
    },
    {
      title: 'Receive',
      subtitle: 'Receive your design within two business days on average.',
      backgroundSrc: '/assets/card-3-bg.jpg',
      content: <Polaroids />,
    },
  ];

  return (
    <section className={'section'}>
      <div className={'outer-container mx-auto'}>
        <div className={'inner-container'}>
          <div
            className={
              'grid mx-auto max-w-[480px] lg:max-w-[initial] w-full gap-8 lg:flex lg:[&>*]:flex-1'
            }
          >
            {cards.map((card, idx) => (
              <FeatureCard
                card={card}
                key={idx}
                className={featureCardStyles[`feature-card-${idx}`]}
              />
            ))}
          </div>
        </div>
        <Gridlines />
      </div>
    </section>
  );
};

const FeatureCard = (props: { card: Card; className?: string }) => {
  return (
    <div className={cn(featureCardStyles['card-container'], props.className)}>
      <img
        src={props.card.backgroundSrc}
        alt=''
        className={featureCardStyles['card-container__background']}
      />
      <>{props.card.content}</>
      <div className={featureCardStyles['card-body']}>
        <h5 className={'font-medium'}>{props.card.title}</h5>
        <p className={cn(featureCardStyles['card-subtitle'], 'mt-2')}>
          {props.card.subtitle}
        </p>
      </div>
    </div>
  );
};

const FeatureMarquees = () => {
  const marquee1 = [
    'Presentations',
    'Logos',
    'Social Media',
    'Email',
    'Mobile Apps',
  ];

  const marquee2 = [
    'Ad creative',
    'Landing pages',
    'Webflow',
    'Print design',
    'Packaging',
  ];

  const marquee3 = [
    'Email',
    'Display Ads',
    'Packaging',
    'User interface',
    'Branding',
  ];

  const FLOATING_IMAGE_SRC = '/assets/box-bg.png';
  const FLOATING_IMAGE_FOREGORUND_SRC = '/assets/box-smile.png';

  return (
    <div className={'relative top-26 text-xs'}>
      <div className={'text-black grid gap-4 absolute -z-10 absolute-centered'}>
        <Marquee>
          {marquee1.map((el, idx) => (
            <TextPill key={idx} text={el} />
          ))}
        </Marquee>
        <Marquee>
          {marquee2.map((el, idx) => (
            <TextPill text={el} key={idx} />
          ))}
        </Marquee>
        <Marquee>
          {marquee3.map((el, idx) => (
            <TextPill text={el} key={idx} />
          ))}
        </Marquee>
      </div>
      <div className={'relative m-auto size-[100px]'}>
        <img
          src={FLOATING_IMAGE_SRC}
          className={'rounded-[19px] absolute -z-10 shadow-2xl shadow-black'}
        />
        <img
          src={FLOATING_IMAGE_FOREGORUND_SRC}
          className={
            'hover:scale-110 transition-all ease-in-out p-4 absolute top-1/2 -translate-y-1/2 duration-400'
          }
        />
      </div>
    </div>
  );
};

import styles from './polaroid.module.css';

const Polaroid = (
  props: {
    children: React.ReactNode;
    className?: string;
  } & HTMLProps<HTMLDivElement>,
) => {
  const { className, ...rest } = props;
  return (
    <div className={cn(styles['container'], props.className)} {...rest}>
      {props.children}
    </div>
  );
};

const TextPill = (props: { text: string }) => {
  return (
    <div
      className={
        'bg-[rgb(from_var(--color-background)_r_g_b_/_70%)] px-3 py-2 rounded-full text-xs text-nowrap w-fit text-foreground'
      }
    >
      {props.text}
    </div>
  );
};

// const Root = (props: {
//   children: ReturnType<
//     typeof Title | typeof Subtitle | typeof Image | typeof Background
//   >[];
// }) => {
//   return <div className={'relative'}>{props.children}</div>;
// };

// const Title = (props: { children: string }) => {
//   return <h5>{props.children}</h5>;
// };
// const Subtitle = (props: { children: string }) => {
//   return <p>{props.children}</p>;
// };

// const Image = (props: { children: ReactNode }) => {
//   const children = React.Children.map(props.children, (child) => {
//     if (!React.isValidElement<HTMLElement>(child)) {
//       return child;
//     }

//     return React.cloneElement(child, {
//       className: cn(child.props.className, 'absolute inset-0 -z-10'),
//     });
//   });
//   return <>{children}</>;
// };

// const Background = (props: { children: ReactNode }) => {
//   return <div>{props.children}</div>;
// };
// const FeatureCard = { Root, Title, Subtitle, Image, Background };

const Vision = (props: { className?: string }) => {
  const VISION_COPY = (
    <h3 className={'font-medium'}>
      The way design <i className={'font-serif'}>should've</i> been
      <br className={'inivisible lg:visible'} /> done in the first place.
    </h3>
  );
  return (
    <section className={'section'}>
      <div className={cn('outer-container', props.className)}>
        <div className={'inner-container text-center'}>{VISION_COPY}</div>
        <Gridlines />
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className={'section'}>
      <div className={'outer-container'}>
        <div className={'inner-container'}></div>
        <Gridlines />
      </div>
    </section>
  );
};

import overviewStyles from './overview.module.css';

const Overview = (props: { className?: string }) => {
  return (
    <section className={'section'}>
      <div className={cn('outer-container', props.className)}>
        <div className={'inner-container'}>
          <div
            className={cn(
              '[--horz-padding:40px]',
              overviewStyles['overview-container'],
              'lg:p-[calc(var(--horz-padding)*2)]',
            )}
          >
            <h6 className={overviewStyles['story-text']}>
              First launched in 2017, Designjoy{' '}
              <i className={'font-serif'}>revolutionized</i> the design industry
              with its subscription-based model. To this day, Designjoy is run
              entirely by <a>Brett</a>. Designjoy doesn't hire extra designers
              or outsource work—instead, it focuses on delvivering top-notch
              quality to a limited roster of clients at a time.
            </h6>
          </div>
        </div>
        <Gridlines />
      </div>
    </section>
  );
};

const CaseStudies = (props: { className?: string }) => {
  const IMAGES = [
    '/assets/work-example-1.png',
    '/assets/work-example-2.png',
    '/assets/work-example-3.png',
  ];
  return (
    <section className={'section'}>
      <div className={cn('outer-container', props.className)}>
        <div className={'inner-container'}>
          <div className={'overflow-hidden rounded-[20px] bg-white p-8'}>
            <Marquee
              className={cn(
                'relative rotate-15 left-1/2 -translate-x-1/2',
                'mb-24',
              )}
            >
              {IMAGES.map((src, idx) => (
                <div className={'size-60 overflow-hidden rounded-md'}>
                  <img src={src} key={idx}></img>
                </div>
              ))}
            </Marquee>
            <h5 className={cn('font-medium')}>Recent Work</h5>
            <h6 className={cn('text-dark-gray', 'mt-2')}>
              We're talking product of the year good
            </h6>
            <SkeuButton
              className={cn('px-4 py-2 rounded-[8px] text-white', 'mt-4')}
              onClick={() => {}}
            >
              See recent work
            </SkeuButton>
          </div>
        </div>
        <Gridlines />
      </div>
    </section>
  );
};

const Benefits = () => {
  return (
    <section className={'section'}>
      <div className={'outer-container'}>
        <div
          className={'inner-container font-mono uppercase text-center text-xs'}
        >
          {/* Membership benefits */}
        </div>
        <Gridlines />
      </div>
    </section>
  );
};

const PressMentions = (props: { className?: string }) => {
  const WEBFLOW_LOGO_SRC = '/assets/webflow.svg';
  const KEVIN_PFP = '/assets/kevin.png';
  return (
    <section className={'section'}>
      <div className={cn('outer-container', props.className)}>
        <div
          className={cn(
            'inner-container text-center [--child-el-w:196px] flex flex-col',
            'lg:flex-row lg:h-auto lg:items-start lg:gap-4',
          )}
        >
          <PressMention>
            <h3>"Designjoy shows that they know the art of subtlety."</h3>
            <div className={'w-[var(--child-el-w)] mx-auto'}>
              <img
                className={'max-w-[initial] w-full lg:flex-1'}
                src={WEBFLOW_LOGO_SRC}
                alt='Webflow logo'
              />
            </div>
          </PressMention>
          <PressMention>
            <h3>"Design is everything, and these guys have nailed it."</h3>
            <div className={'flex mx-auto gap-4 -mt-0.5 items-center'}>
              <div className={'h-0'}>
                <img
                  src={KEVIN_PFP}
                  alt=''
                  className={'size-[65px] relative centered'}
                />
              </div>
              <div
                className={'flex flex-col text-left font-sans justify-center'}
              >
                <h6 className={'tracking-tight font-medium'}>Kevin O'Leary</h6>
                <p className={'text-accent'}>Shark Tank</p>
              </div>
            </div>
          </PressMention>
        </div>
        <Gridlines />
      </div>
    </section>
  );
};

const PressMention = (props: { children?: ReactNode }) => {
  return (
    <div className={'font-serif flex flex-col justify-center gap-8 mb-14'}>
      {props.children}
    </div>
  );
};

const PRICING_SECTION_ID = 'pricing';
const Pricing = (props: { className?: string }) => {
  return (
    <section className={'section'}>
      <div className={cn('outer-container', props.className)}>
        <div className={cn('inner-container')}>
          <div className={'mb-12'} id={PRICING_SECTION_ID}>
            <p className={'uppercase text-accent font-mono text-center mb-4'}>
              Pricing
            </p>
            <h2 className={'text-center font-medium px-2'}>
              One subscription, <br className={'invisible lg:visible'} />
              <i className={'font-serif'}>endless possibilities.</i>
            </h2>
          </div>
          <div className={'flex lg:flex-row flex-col gap-8'}>
            <div className={cn('grid gap-8', 'lg:basis-4/10 lg:shrink-0')}>
              <div
                className={
                  'bg-white p-8 rounded-[var(--border-radius)] relative pt-[280px]'
                }
              >
                <FloatingCard
                  className={cn(
                    'absolute -top-12 right-0 translate-x-1/4 h-[300px] md:h-[400px] md:translate-x-1/6 max-w-[initial]  z-10',
                    'lg:h-[300px]',
                  )}
                />
                <StatusTag className={'text-white'} />
                <h2 className={'font-medium mt-6'}>
                  Join <br className={'md:block hidden'} />
                  Designjoy
                </h2>
              </div>
            </div>
            <JoinToday className={''} />
          </div>
        </div>
        <Gridlines />
      </div>
    </section>
  );
};

import jtStyles from './join-today.module.css';
const JoinToday = (props: { className?: string }) => {
  const PRICE = <h2 className={'inline font-medium'}>$5995</h2>;
  const PERKS = [
    'One request at a time',
    'Avg. 48 hour delivery',
    'Unlimited brands',
    'Webflow development',
    'Unlimited stock photos',
    'Up to 2 users',
    'Pause or cancel anytime',
  ];
  const FOOTER_IMAGE_SRC = '/assets/orange-blob.svg';

  const CTA_IMAGE_SRC = '/assets/animated-smile.svg';

  return (
    <div className={cn(jtStyles['card'], props.className)}>
      <p
        className={
          'text-flavor uppercase text-dark-gray p-2 border-white/15 border-[1px] w-fit rounded-sm'
        }
      >
        Pause or Cancel anytime
      </p>
      <h4 className={cn('font-medium', 'mt-2')}>Monthly Club</h4>
      <div className={'mt-3 flex gap-0.5 items-baseline-last'}>
        {PRICE}
        <span>/</span>
        <span className={'text-accent'}>month</span>
      </div>
      <div
        className={'border-[1px] border-background border-dashed mt-4 mb-12'}
      />
      <div className={jtStyles['perks']}>
        <div className={jtStyles['perks__tag']}>Included</div>
        <ul>
          {PERKS.map((el, idx) => (
            <li key={idx}>{el}</li>
          ))}
        </ul>
      </div>
      <button className={jtStyles['cta']}>
        <div
          className={
            'inline-block bg-orange-red outline-orange-2/85 outline-1 p-4 align-middle rounded-lg'
          }
        >
          <div className={'size-6 contain-layout flex justify-center'}>
            <img src={CTA_IMAGE_SRC} className={''} />
          </div>
        </div>
        <span className={'px-4'}>Join Today</span>
      </button>
      <img
        src={FOOTER_IMAGE_SRC}
        alt=''
        className={
          'absolute bottom-0 right-0 translate-x-4/10 -z-10 translate-y-5/11 size-40 md:size-50'
        }
      />
    </div>
  );
};

const FeatureList = () => {
  return (
    <section className={'section'}>
      <div className={'outer-container'}>
        <div className={'inner-container'}></div>
        <Gridlines />
      </div>
    </section>
  );
};

const FAQ = () => {
  return (
    <section className={'section'}>
      <div className={'outer-container'}>
        <div className={'inner-container'}></div>
        <Gridlines />
      </div>
    </section>
  );
};

const Logo = (props: { className?: string; color?: 'black' | 'white' }) => {
  const LOGO_PATH = '/assets/logo.svg';
  const ANIMATED_SMILE = '/assets/animated-smile.svg';

  return (
    <div className={cn('flex', props.className)}>
      <img src={ANIMATED_SMILE} className={'min-w-6 w-6 mr-[6px]'} />
      <img src={LOGO_PATH} alt='' className={'h-6'} />
    </div>
  );
};

const BOOKING_SECTION_ID = 'book';
import footerStyles from './footer.module.css';
const Book = (props: { className?: string }) => {
  const BOOKING_HEADLINE = (
    <h2 className={'mr-24 font-medium'}>
      See if Designjoy is the right fit for you{' '}
      <i className={'font-serif'}>(it totally is)</i>
    </h2>
  );

  const BOOKING_SUBLINE = (
    <h6 className={'text-dark-gray mt-4'}>
      Schedule a quick, 15 minute guided tour through Designjoy.
    </h6>
  );

  return (
    <section className={'section bg-black text-background'}>
      <div className={cn('outer-container pb-6', props.className)}>
        <div
          className={cn('inner-container', footerStyles['container'])}
          id={BOOKING_SECTION_ID}
        >
          <div className={'flex flex-col'}>
            <Logo className={'invert pt-10 pb-16'} />
            {BOOKING_HEADLINE}
            {BOOKING_SUBLINE}
            <Footer className={'max-lg:hidden'} />
          </div>
          <Calendar className={'mt-10 lg:col-[right]'} />
          <Footer className={'lg:hidden'} />
        </div>
        <Gridlines className={'bg-[#2c2c2c]'} />
      </div>
    </section>
  );
};

const Footer = (props: { className?: string }) => {
  return (
    <div
      className={cn('flex flex-col flex-1 justify-end pt-20', props.className)}
    >
      <img
        src='/assets/footer-graphic.svg'
        alt='bunch of smiling bubbles'
        className={'mt-12'}
      />
      <div className={'text-accent mt-4'}>
        <p>Headquartered in Phoenix, Arizona</p>
        <div className={'text-dark-gray mt-1'}>
          <p className={''}>Terms of service</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};
import cardStyles from './join-card.module.css';
import { SolidButton } from '@/components/buttons/solid-button';
import { ActionTile } from '@/components/buttons/action-tile';
const JoinCard = (props: { className?: string }) => {
  const lenis = useLenis();
  const HEADER_COPY = (
    <h2 className={'mr-6 mt-20 font-medium'}>
      Join <br className={'sm:block hidden'}></br>Designjoy
    </h2>
  );
  const CAPTION_COPY = (
    <p className={'mt-4 opacity-95'}>One subscription to rule them all.</p>
  );
  const PRICING_COPY = <h6 className={'font-medium'}>See pricing</h6>;

  return (
    <div
      className={cn(
        cardStyles['card-body'],
        '[--floating-card-width:260px] md:max-lg:[--floating-card-width:400px] lg:[--floating-card-width:250px]',
        props.className,
      )}
    >
      <StatusTag />
      <FloatingCard
        className={
          'absolute -right-0 translate-x-1/4 top-3 w-[var(--floating-card-width)] max-w-[initial]'
        }
      />
      {HEADER_COPY}
      {CAPTION_COPY}
      <SolidButton
        className={'text-foreground mt-6'}
        onClick={() => {
          lenis?.scrollTo(`#${PRICING_SECTION_ID}`);
        }}
      >
        {PRICING_COPY}
      </SolidButton>
      <div className={'mt-8'}>
        <ActionTile
          href='/'
          icon={<img src='/assets/pfp.png'></img>}
          title='Book a 15-min intro call'
          subtitle={'Schedule now'}
        />
      </div>
    </div>
  );
};

const StatusTag = (props: { className?: string }) => {
  return (
    <div
      className={cn(
        'rounded-full bg-black w-fit px-3 py-2 flex items-center',
        props.className,
      )}
    >
      <div
        className={
          'relative h-[.4lh] w-[.4lh] rounded-full bg-orange-2 text-center inline-block mr-2'
        }
      >
        <div
          className={
            'inset-0 absolute rounded-full animate-ping bg-orange-2 inline-block text-center'
          }
        />
      </div>
      <div className={'text-sm'}>Start today</div>
    </div>
  );
};

import Cal, { getCalApi } from '@calcom/embed-react';
import {
  cloneElement,
  DetailedHTMLProps,
  HTMLProps,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import React from 'react';
import { Marquee } from '@/components/marquee/marquee';
import { div, h5 } from 'motion/react-client';
import { FlatButton, SkeuButton } from '@/components/buttons';
import { defaultOverrides } from 'next/dist/server/require-hook';
import { useLenis } from 'lenis/react';
const Calendar = (props: { className?: string }) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '30min' });
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: true,
        layout: 'month_view',
      });
    })();
  }, []);
  return (
    <Cal
      namespace='30min'
      calLink='blankform/30min'
      config={{ layout: 'month_view', theme: 'dark' }}
      className={cn(props.className)}
    />
  );
};
