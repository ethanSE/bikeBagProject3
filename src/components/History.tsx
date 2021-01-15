import styles from '../styles/History.module.css';
import frameShape from '../assets/images/frameShape.jpeg';
import tracedShape from '../assets/images/tracedShape.jpeg';
import preppedMaterialsBagOne from '../assets/images/preppedMaterialsBagOne.jpeg';
import firstAttatchmentMethod from '../assets/images/firstAttatchmentMethod.jpeg';
import greenZipperSide from '../assets/images/greenZipperSide.jpeg';
import greenBottleSide from '../assets/images/greenBottleSide.jpeg';
import sandyRiverDelta from '../assets/images/sandyRiverDelta.jpeg';
import IMG_7651 from '../assets/images/IMG_7651.JPG';
import newZipTop from '../assets/images/newZipTop.jpeg';
import newZipSide from '../assets/images/newZipSide.jpeg';
import final from '../assets/images/final.JPEG';

const blogInfo: BlogPost[] = [
    {
        title: 'First Attempt',
        intro: 'As a regular bike commuter I was looking for a way to get some of the weight off of my back and onto the frame of my bike. I had previously used panniers and found them to be awkward and often overkill for the amount of stuff I needed to carry. There are many custom bag manufacturers online but they tend to be fairly expensive and I figured it would be a fun project to make my own.',
        outro: 'This design, while simple, has some drawbacks. Having only a single pocket means the cargo tends to settle towards the bottom and then pushes the sides outward. The bag would need to either have to be shorter in the vertical dimension or have a baffle to minimize bulging.',
        photos: [
            {
                source: frameShape,
                alt: 'traced template within bike frame',
                text: 'I held a piece of paperboard behind the bike and traced out the shape of the frame.',
            },
            {
                source: tracedShape,
                alt: 'shape outline on fabric',
                text: 'Transferred the shape to the fabric, added seam allowances',
            },
            {
                source: preppedMaterialsBagOne,
                alt: 'traced template within bike frame',
                text: 'Repeat with the shape flipped over, and cut out the top, bottom, front, and back at a chosen width',
            },
            {
                source: firstAttatchmentMethod,
                alt: 'traced template within bike frame',
                text: 'To attatch the bag to the frame I sewed a strip of nylon webbing to the sides of the bag that contact the frame and looped around it using double sided velcro tape',
            },
        ]
    },
    {
        title: 'Adding More Pockets',
        intro: 'The idea here was to solve two of the biggest problems of the first bag: the sides buling and difficulty accessing the contents. To this end the main compartment was split into a top and bottom section each with their own zipper and an additional water bottle pocket.',
        outro: 'The three pocket design was definitely an improvement over the single pocket design. The contents were much easier to access, although the zipper usage was still rough.',
        photos: [
            {
                source: greenZipperSide,
                alt: 'left side of three section design',
                text: 'Three section design, left side.',
            },
            {
                source: greenBottleSide,
                alt: 'shape outline on fabric',
                text: 'Three section design, right side.',
            },
            {
                source: sandyRiverDelta,
                alt: 'traced template within bike frame',
                text: 'Biking the dog out to Sandy River Delta Park (trailer not pictured)',
            },
        ]
    },
    {
        title: 'Waterproof fabric',
        intro: 'I got a new (to me) bike and wanted a new custom bag as it was a slightly different shape. I also wanted to try out using waterproof fabric. This is made from X-Pac VX21. At ~$21 per yard this is not the cheapest fabric but it is waterproof and very durable.',
        outro: `This material can be more difficult to sew as the feed dogs don't get very much purchase on the inner waterproof membrane. This problem is more noticable when trying to sew multiple layers together as in the corners.`,
        photos: [
            {
                source: IMG_7651,
                alt: 'waterproof 2 section design left side',
                text: 'First use of the water proof fabric. At three inches wide this bag is slightly too wide.',
            }
        ]
    },
    {
        title: 'New Attatchment and Zipper',
        intro: 'Previous designs used a zipper on the top seam. This tends to twist apart when open making the zipper dificult to close. For this next iteration I sewed the zipper into the side. Fabric and velco straps come out of the seams which pulls the sides taut, maintaing a slim profile when loaded.',
        outro: `This zipper style is much better. I really like that the new strap system pulls the bag into keeping its shape.`,
        photos: [
            {
                source: newZipSide,
                alt: 'new design with zipper sewn into side',
                text: 'I miscalculated and made the rear straps too short, forcing the bag backwards. I plan to add longer straps and a front cord to pull it taut front to back',
            },
            {
                source: newZipTop,
                alt: 'top down photo showing narrower width',
                text: 'new 2 1/4 inch width',
            }
        ]
    },
    {
        title: 'Further Refinements',
        intro: 'This is essentially the same design as the previous bag but with the addition of second pocket and with more experience sewing zippers.',
        outro: `This design seems to work well enough.`,
        photos: [
            {
                source: final,
                alt: 'new design with zipper sewn into side',
                text: 'most recent iteration',
            }
        ]
    }
]

export default function History() {
    return (
        <div className={styles.history}>
            <h1>History</h1>
            {blogInfo.map((post) => {
                <Bag
                    title={post.title}
                    intro={post.intro}
                    photos={post.photos}
                    outro={post.outro}
                />
            })}
        </div>
    )
}

function Bag(props: BlogPost) {
    return (
        <div className={styles.bagDiv}>
            <h1>{props.title}</h1>
            <p className={styles.introductionConclusion}>{props.intro} </p>

            <div className={styles.imageGrid}>
                {props.photos.map((photo: BlogPhoto) => {
                    <ImageDiv
                        source={photo.source}
                        alt={photo.alt}
                        text={photo.text}
                    />
                })}
            </div>

            <p className={styles.introductionConclusion}>{props.outro}</p>
        </div>
    )
}

function ImageDiv(props: BlogPhoto) {
    return (
        <div className={styles.photoAndDescription}>
            <img className={styles.image} src={props.source} alt={props.alt} />
            <p>{props.text}</p>
        </div>
    )
}