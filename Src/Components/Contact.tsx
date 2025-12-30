import { Mail, Github, Linkedin, BarChart3 } from "lucide-react";
import { useInView } from "@/Hooks/UseInView";
import ContactForm from "./ContactForm";
import ScrollReveal from "./ScrollReveal";


const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "dev.anubhavchaurasia@gmail.com",
    href: "mailto:dev.anubhavchaurasia@gmail.com",
  },
  {
    icon: Github,
    title: "GitHub",
    value: "@i8o8i-Developer",
    href: "https://github.com/i8o8i-Developer",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "anubhav16o8",
    href: "https://linkedin.com/in/anubhav16o8",
  },
  {
    icon: BarChart3,
    title: "Kaggle",
    value: "anubhav16o8",
    href: "https://kaggle.com/anubhav16o8",
  },
];

const Contact = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 2xl:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-20">
          <div
            ref={ref}
            className={`max-w-5xl mx-auto transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Section Number */}
            <ScrollReveal direction="up">
              <p className="font-mono text-primary text-xs sm:text-sm 2xl:text-base mb-3 sm:mb-4 2xl:mb-6 tracking-wider text-center">07. What Is Next?</p>
            </ScrollReveal>

            {/* Title */}
            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 2xl:mb-8 text-center">
                Get In <span className="text-gradient">Touch</span>
              </h2>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal direction="up" delay={200}>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg 2xl:text-xl leading-relaxed mb-8 sm:mb-12 2xl:mb-16 text-center max-w-2xl mx-auto">
                I Am Currently Looking For New Opportunities And Exciting Projects.
                Whether You Have A Question, Want To Collaborate On A Project, Or Just
                Want To Say Hi, My Inbox Is Always Open!
              </p>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 2xl:gap-16">
              {/* Contact Form */}
              <ScrollReveal direction="left" delay={300}>
                <div className="border-2 border-border bg-card p-4 sm:p-6 md:p-8 2xl:p-10 rounded-lg h-full hover:border-primary transition-colors">
                  <h3 className="text-base sm:text-xl 2xl:text-2xl font-semibold text-foreground mb-4 sm:mb-6 2xl:mb-8 flex items-center gap-2">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Send a Message
                  </h3>
                  <ContactForm />
                </div>
              </ScrollReveal>

              {/* Contact Methods */}
              <ScrollReveal direction="right" delay={400}>
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-base sm:text-xl 2xl:text-2xl font-semibold text-foreground mb-4 sm:mb-6 2xl:mb-8">
                    Other Ways to Connect
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 2xl:gap-6">
                    {contactMethods.map((method, index) => (
                      <a
                        key={method.title}
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-border bg-card p-3 sm:p-5 2xl:p-6 rounded-lg group hover:border-primary transition-colors"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <method.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary mx-auto mb-2 sm:mb-3 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_hsl(var(--primary))] transition-all duration-300" />
                        <p className="text-foreground font-medium text-xs sm:text-sm 2xl:text-base mb-0.5 sm:mb-1 text-center">
                          {method.title}
                        </p>
                        <p className="text-muted-foreground text-[10px] sm:text-xs truncate font-mono text-center">
                          {method.value}
                        </p>
                      </a>
                    ))}
                  </div>

                  {/* Additional Info */}
                  <div className="border-2 border-border bg-card p-4 sm:p-6 2xl:p-8 rounded-lg mt-4 sm:mt-6 2xl:mt-8">
                    <p className="text-muted-foreground text-xs sm:text-sm 2xl:text-base leading-relaxed">
                      I Typically Respond Within 24-48 Hours. For Urgent Inquiries, 
                      Please Reach Out Via LinkedIn For A Quicker Response.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Contact;