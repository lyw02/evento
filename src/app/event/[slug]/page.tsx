import H1 from "@/components/h1";
import { getEvent } from "@/lib/server-utils";
import Image from "next/image";

type EventPageProps = {
  params: {
    slug: string;
  };
};

export const generateMetedata = async ({ params }: EventPageProps) => {
  const event = await getEvent(params.slug);
  return {
    title: event.name,
  };
};

export const generateStaticParams = async () => {
  // top popular for SSG
  return [{
    slug: "3d-animation-workshop"
  }]
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEvent(params.slug);

  return (
    <main className="relative">
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py20">
        <Image
          src={event.imageUrl}
          alt="Event background image"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover z-0 blur-3xl"
        />
        <div className="z-1 relative flex flex-col gap-x-6 lg:gap-16 lg:flex-row">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />
          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <H1 className="mb-2 mt-1 whitespace-nowrap">{event.name}</H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>
            <button className="bg-white/20 text-lg capitalize rounded-md border-white/10 border-2 mt-5 lg:mt-auto py-2 hover:scale-105 focus:scale-105 active:scale-[1.02] transition">
              Get tickets
            </button>
          </div>
        </div>
      </section>

      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>
        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-8">{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
      {children}
    </p>
  );
}
