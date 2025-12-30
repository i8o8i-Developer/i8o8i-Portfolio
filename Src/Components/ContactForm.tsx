import { useState } from "react";
import { Send, User, Mail, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import { Textarea } from "@/Components/UI/Textarea";
import { useToast } from "@/Hooks/Use-Toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed To Send Message');
      }

      toast({
        title: "Message Sent!",
        description: "Thank You For Reaching Out. I Will Get Back To You Soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error Sending Message:", error);
      toast({
        title: "Error",
        description: "Failed To Send Message. Please Try Again Later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Input */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="pl-12 py-6 bg-secondary/50 border-border/50 focus:border-primary/50 focus:bg-secondary/80 transition-all font-mono text-sm"
          />
        </div>
      </div>

      {/* Email Input */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="email"
            name="email"
            placeholder="Your.Email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="pl-12 py-6 bg-secondary/50 border-border/50 focus:border-primary/50 focus:bg-secondary/80 transition-all font-mono text-sm"
          />
        </div>
      </div>

      {/* Message Textarea */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Textarea
            name="message"
            placeholder="Your Message..."
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="pl-12 pt-4 bg-secondary/50 border-border/50 focus:border-primary/50 focus:bg-secondary/80 transition-all font-mono text-sm resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full cyber-button font-mono py-6 text-base group"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </span>
      </Button>
    </form>
  );
};

export default ContactForm;