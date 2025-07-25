import { Button } from "@/components/ui/button";
import {
  Ambulance,
  Baby,
  Brain,
  HeartPulse,
  Stethoscope,
  Syringe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const servicesConfig: ServicesCardProps[] = [
  {
    title: "General Checkup",
    description: "Routine health assessments to keep you in good shape.",
    icon: <Stethoscope className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Vaccination",
    description: "Stay protected with essential immunizations for all ages.",
    icon: <Syringe className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Cardiology",
    description: "Comprehensive heart care from diagnosis to treatment.",
    icon: <HeartPulse className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Neurology",
    description: "Expert care for brain and nervous system disorders.",
    icon: <Brain className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Pediatrics",
    description: "Gentle, specialized care for infants, children, and teens.",
    icon: <Baby className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Emergency Services",
    description: "24/7 emergency care when every second counts.",
    icon: <Ambulance className="w-6 h-6 text-green-600" />,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <section className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-2 mt-8 md:mt-16 items-center">
        <div className="col-span-3 lg:col-span-1 px-4 sm:px-8 md:px-14 w-full mx-auto ">
          <Image
            width={350}
            height={300}
            src={
              "https://res.cloudinary.com/dsdevazn9/image/upload/v1753443724/doctor-image-hero-section_ctvxwy.jpg"
            }
            alt="decorative image for landing page"
            className="object-cover sm:hidden "
          />
          <p className="text-3xl my-2 font-semibold text-primary ">
            Mayamatrix<span className="text-zinc-800"> Hospital</span>
          </p>
          <h1 className="text-5xl text-green-600 font-bold tracking-tight mb-4 ">
            {" "}
            Your Partner In Health and Wellness
          </h1>
          <p className="tracking-tight text-gray-600 text-md  ">
            Whether it’s a routine check-up or complex treatment, Mayamatrix
            Hospital offers comprehensive healthcare services tailored to your
            needs. With a focus on both comfort and results, we’re here to
            support your journey to better health every step of the way.
          </p>
          <div className="my-4">
            <Link href={"/"}>
              <Button className="cursor-pointer text-md rounded-full">
                Book An Appointment
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden md:block col-span-2 lg:col-span-1">
          <Image
            width={500}
            height={500}
            src={
              "https://res.cloudinary.com/dsdevazn9/image/upload/v1753443724/doctor-image-hero-section_ctvxwy.jpg"
            }
            alt="decorative image for landing page"
            className="object-cover"
          />
        </div>
      </section>
      <section className="mt-16 bg-green-100 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-600 ">
          Our Healthcare Services
        </h2>
        <div
          className="bg-green-50 w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
         gap-2  lg:gap-6 place-items-center "
        >
          {servicesConfig.map(({ title, description, icon }) => (
            <ServiceCard
              key={title}
              title={title}
              description={description}
              icon={icon}
            />
          ))}
        </div>
      </section>
      <section className="mt-24 md:mt-16 flex flex-col md:flex-row-reverse md:px-16 justify-center items-center">
        <div className="md:w-2/5 hidden md:block mx-auto p-4">
          <Image
            height={350}
            width={300}
            alt="about us image"
            src={"/about.jpg"}
            className="w-full object-cover"
          ></Image>
        </div>
        <div className="flex flex-col md:w-3/5 mx-auto px-4 md:pr-8 lg:pr-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-600">
            About Us
          </h2>
          <p className="tracking-tight text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
            quaerat odit odio facilis autem dicta accusantium, numquam, earum
            commodi debitis consectetur pariatur quos nemo magni perspiciatis
            laborum asperiores! Aspernatur quisquam labore minima mollitia quas
            fugiat quos cum debitis officia delectus vero ipsum magni fuga natus
            ipsa laborum velit, ab modi. Aspernatur quisquam labore minima
            mollitia quas fugiat quos cum debitis officia delectus vero ipsum
            magni fuga natus ipsa laborum velit, ab modi.
          </p>
        </div>
      </section>
    </div>
  );
}
type ServicesCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};
function ServiceCard({ title, description, icon }: ServicesCardProps) {
  return (
    <div className="bg-primary hover:bg-primary/85 p-3  text-gray-50 rounded-lg  max-w-[22rem] flex gap-3 items-center">
      <div className="rounded-full bg-white w-[30%] aspect-square grid place-items-center">
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="my-1 text-xl font-semibold">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
