import React from "react";
import { FeatureCard, Hero } from "components";

function Landing({ attributes, content }) {
  let { features, ...rest } = attributes;
  return (
    <>
      <Hero {...rest} />
      <section className="text-gray-700 body-font my-10 mx-4 md:container md:mx-auto xl:max-w-screen-lg">
        <h2 className="text-2xl font-bold tracking-tighter title-font my-8 text-center lg:text-4xl">
          Our features
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.icon} {...feature} />
          ))}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const {
    default: { attributes, html },
  } = await import(`../content/landing.md`);

  return {
    props: {
      attributes,
      content: html,
    },
  };
}

export default Landing;
