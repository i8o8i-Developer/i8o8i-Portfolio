import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useInView } from "@/Hooks/UseInView";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    role: "Agricultural Scientist",
    company: "ICAR Research Institute",
    content: "Anubhav's AgriSense Guardian Has Revolutionized How We Approach Climate Intelligence In Agriculture. The Multi-Agent AI System He Built Has Helped Thousands Of Farmers Make Better Decisions. His Technical Expertise Combined With His Understanding Of Real-World Problems Is Remarkable.",
    rating: 5,
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "CTO",
    company: "TechSecure Solutions",
    content: "Working With Anubhav On Our Security Infrastructure Was An Exceptional Experience. His Deep Knowledge Of Quantum-Resistant Cryptography And Ability To Implement Complex Security Protocols Is Outstanding. He Delivered A System That Exceeded Our Expectations.",
    rating: 5,
  },
  {
    id: "3",
    name: "Michael Chen",
    role: "Lead Developer",
    company: "BlockChain Innovations",
    content: "Anubhav's Blockchain Implementation Skills Are Top-Notch. He Built A Custom Blockchain Solution For Us That Was Both Secure And Efficient. His Attention To Detail And Commitment To Quality Code Made Him A Pleasure To Work With.",
    rating: 5,
  },
  {
    id: "4",
    name: "Sarah Williams",
    role: "Project Manager",
    company: "HealthTech Global",
    content: "The Hospital Management System Anubhav Developed For Us Transformed Our Operations. His Full-Stack Expertise And Understanding Of Healthcare Workflows Resulted In A Solution That Our Staff Loves Using. Highly Recommend!",
    rating: 5,
  },
  {
    id: "5",
    name: "Amit Patel",
    role: "Founder",
    company: "AgriTech Startup",
    content: "Anubhav Is Not Just A Developer, He Is A Problem Solver. When We Approached Him With Our Complex Agricultural Data Challenge, He Designed An Elegant Solution Using AI That Now Processes Over 800GB Of Data Daily. Truly Impressive Work.",
    rating: 5,
  },
];

const Testimonials = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 2xl:py-24 relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-20 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Title */}
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 2xl:mb-16 max-w-5xl mx-auto">
            <h2 className="text-lg sm:text-2xl md:text-3xl 2xl:text-4xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
              <span className="section-number text-sm sm:text-base">06.</span>
              Testimonials
            </h2>
            <div className="flex-1 h-[2px] bg-primary max-w-[80px] sm:max-w-xs" />
          </div>

          {/* Main Testimonial Card */}
          <div className="max-w-5xl mx-auto">
            <div className="border-2 border-border bg-card p-5 sm:p-8 md:p-12 2xl:p-16 rounded-lg relative hover:border-primary transition-colors">
              {/* Quote Icon */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 opacity-10">
                <Quote className="w-12 h-12 sm:w-20 sm:h-20 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex gap-0.5 sm:gap-1 mb-4 sm:mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < currentTestimonial.rating
                        ? "text-primary fill-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-sm sm:text-lg md:text-xl 2xl:text-2xl text-foreground leading-relaxed mb-6 sm:mb-8 2xl:mb-10 relative z-10">
                &ldquo;{currentTestimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-bold text-sm sm:text-lg">
                  {currentTestimonial.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm sm:text-base 2xl:text-lg">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-muted-foreground text-xs sm:text-sm 2xl:text-base font-mono">
                    {currentTestimonial.role} @ {currentTestimonial.company}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-border">
                <div className="flex gap-1.5 sm:gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-primary w-4 sm:w-6"
                          : "bg-muted-foreground/30 hover:bg-primary/50"
                      }`}
                      aria-label={`Go To Testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-1.5 sm:gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-1.5 sm:p-2 rounded-lg border-2 border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-1.5 sm:p-2 rounded-lg border-2 border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Testimonial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 max-w-5xl mx-auto">
            {testimonials
              .filter((_, i) => i !== currentIndex)
              .slice(0, 3)
              .map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => setCurrentIndex(testimonials.findIndex(t => t.id === testimonial.id))}
                  className="border-2 border-border bg-card p-3 sm:p-4 rounded-lg text-left group hover:border-primary transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] sm:text-xs font-bold flex-shrink-0">
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground text-xs sm:text-sm font-medium group-hover:text-primary transition-colors truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-muted-foreground text-[10px] sm:text-xs truncate">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-[10px] sm:text-xs line-clamp-2">
                    &ldquo;{testimonial.content.slice(0, 80)}...&rdquo;
                  </p>
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;