// Landing page
"use client";
import MaxWidth from "@/components/templates/max-width";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import {
  Ambulance,
  Baby,
  Brain,
  HeartPulse,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Stethoscope,
  Syringe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthContext } from "@/components/templates/providers";

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
type FormFields = {
  name: string;
  phone: string;
  message: string;
};
export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>();

  const onSubmit = async (formData: FormFields) => {
    const { name, message, phone } = formData;
    try {
      const response = await fetch("https://formspree.io/f/mgvykzye", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          message,
        }),
      });

      if (response.ok) {
        toast.success("Message sent sucessfully");
        reset();
      } else {
        throw new Error("Bad API request");
      }
    } catch (error) {
      toast.error("Error sending message");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Hero section starts */}
      <MaxWidth>
        <motion.section
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-2 mt-8 md:mt-16 items-center"
        >
          <motion.div
            initial={{
              x: -30,
            }}
            animate={{
              x: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="col-span-3 lg:col-span-1 px-4 sm:px-8 md:px-14 w-full mx-auto "
          >
            {/* resonsive image display */}
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
              <Link href={"#contact"}>
                <Button className="cursor-pointer text-md rounded-full">
                  Book An Appointment
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{
              x: 30,
            }}
            animate={{
              x: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="hidden md:block col-span-2 lg:col-span-1"
          >
            <Image
              width={500}
              height={500}
              src={
                "https://res.cloudinary.com/dsdevazn9/image/upload/v1753443724/doctor-image-hero-section_ctvxwy.jpg"
              }
              alt="decorative image for landing page"
              className="object-cover"
            />
          </motion.div>
        </motion.section>
      </MaxWidth>
      {/* Services section starts */}
      <section id="services" className="mt-16 bg-green-100 py-16">
        <MaxWidth>
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
        </MaxWidth>
      </section>
      {/* about us section */}
      <MaxWidth>
        <motion.section
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          viewport={{ once: true, amount: 0.4 }}
          id="about"
          className="mt-24 md:mt-16 flex flex-col md:flex-row-reverse md:px-16 justify-center items-center"
        >
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
              laborum asperiores! Aspernatur quisquam labore minima mollitia
              quas fugiat quos cum debitis officia delectus vero ipsum magni
              fuga natus ipsa laborum velit, ab modi. Aspernatur quisquam labore
              minima mollitia quas fugiat quos cum debitis officia delectus vero
              ipsum magni fuga natus ipsa laborum velit, ab modi.
            </p>
          </div>
        </motion.section>
      </MaxWidth>
      {/* contact us section */}
      <motion.section
        initial={{
          opacity: 0,
          y: 100,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        viewport={{ once: true, amount: 0.4 }}
        id="contact"
        className="bg-green-100 mt-20 px-6 "
      >
        <MaxWidth>
          <div className=" max-w-3xl w-full mx-auto py-20  flex flex-col sm:flex-row sm:justify-between gap-8 items-center">
            {/* form action via formspree */}

            <div className="flex flex-col w-full max-w-[20rem] space-y-4 h-full self-start">
              <div className=" mb-8 sm:mb-4">
                <h2 className="text-3xl font-bold   text-green-600 tracking-tight leading-tighter">
                  Get In Touch With Us
                </h2>
                <p className="text-sm mt-1 text-gray-600 tracking-tight">
                  We’re here to answer your questions, book appointments, and
                  guide you to the right care.
                </p>
              </div>
              <div className="text-xl text-semibold flex  items-center gap-4 ">
                <Phone className="h-7 w-7 text-blue-500" />
                <div className="flex  flex-col">
                  <h3 className="font-semibold">Call Us</h3>{" "}
                  <p className="text-base">01-123456</p>
                </div>
              </div>
              <div className="text-xl text-semibold flex  items-center gap-4">
                <Mail className="h-7 w-7 text-blue-500  rounded " />
                <div className="flex  flex-col">
                  <h3 className="font-semibold">Email Us</h3>{" "}
                  <p className="text-base">hospital@mayamatrix.com</p>
                </div>
              </div>
              <div className="text-xl text-semibold flex  items-center gap-4">
                <MapPin className="h-7 w-7 text-blue-500" />
                <div className="flex  flex-col">
                  <h3 className="font-semibold">Location</h3>{" "}
                  <p className="text-base">Lainchaur-26, Kathmandu</p>
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              action=""
              method="POST"
              className="w-full max-w-[22rem]  py-2 space-y-4 flex flex-col items-center
            rounded-lg "
            >
              <div className="w-full">
                {" "}
                <Input
                  {...register("name", {
                    minLength: {
                      value: 3,
                      message: "Enter valid name",
                    },
                  })}
                  className="py-6 bg-white"
                  required
                  placeholder="Your Full Name"
                />
                {errors?.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="w-full">
                {" "}
                <Input
                  {...register("phone", {
                    pattern: {
                      // nepali landline and mobile number regex
                      value: /^(?:98|97)\d{8}$|^0\d{1,2}\d{6,7}$/,
                      message: "Enter valid nepali phone number",
                    },
                  })}
                  className="py-6 bg-white"
                  type="text"
                  required
                  placeholder="Your Phone"
                />
                {errors?.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
              <div className="w-full">
                <Textarea
                  {...register("message", {
                    minLength: {
                      value: 5,
                      message: "Message is too short",
                    },
                  })}
                  className="py-5 bg-white min-h-24"
                  placeholder="Your Message"
                ></Textarea>
                {errors?.message && (
                  <p className="text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                disabled={isSubmitting}
                className="w-32 mt-2 p-5 text-lg"
                type="submit"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </MaxWidth>
      </motion.section>
      <footer className="mx-auto my-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Mayamatrix Hospital. All Rights
          Reserved
        </p>
      </footer>
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
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      viewport={{ once: true, amount: 0.5 }}
      className="bg-primary hover:bg-primary/85 p-3  text-gray-50 rounded-lg  max-w-[22rem] flex gap-3 items-center"
    >
      <div className="rounded-full bg-white w-[30%] aspect-square grid place-items-center">
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="my-1 text-xl font-semibold">{title}</h3>
        <p>{description}</p>
      </div>
    </motion.div>
  );
}
