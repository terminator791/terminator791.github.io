import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gray-900 dark:bg-black text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h3 
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              Iqbal Bagus
            </motion.h3>
            <p className="text-gray-400 max-w-sm">
              Passionate computer engineering student creating innovative solutions 
              and building meaningful digital experiences.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              {[
                { id: 'about', label: 'About Me' },
                { id: 'studies', label: 'Education' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => {
                    const element = document.getElementById(link.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold">Get in Touch</h4>
            <div className="space-y-2">
              <motion.a
                href="mailto:iqbalbagus@example.com"
                className="text-gray-400 hover:text-white transition-colors block"
                whileHover={{ x: 5 }}
              >
                iqbalbagus@example.com
              </motion.a>
              <motion.a
                href="https://wa.me/+62895423630500"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors block"
                whileHover={{ x: 5 }}
              >
                +62 895 4236 30500
              </motion.a>
              <motion.p 
                className="text-gray-400"
                whileHover={{ x: 5 }}
              >
                Semarang, Indonesia
              </motion.p>
            </div>
            <div className="flex space-x-4 pt-2">
              {[
                { icon: Github, href: "https://github.com/terminator791", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "mailto:iqbalbagus057@gmail.com", label: "Email" }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} Iqbal Bagus. All rights reserved.
          </p>
          <motion.p 
            className="flex items-center gap-1 text-gray-400 text-sm"
            whileHover={{ scale: 1.05 }}
          >
            Made with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={16} className="text-red-500 fill-current" />
            </motion.span>
            {' '}and lots of coffee
          </motion.p>
        </motion.div>

        {/* Back to Top */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-8"
        >
          <motion.button
            onClick={scrollToTop}
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1 mx-auto"
            whileHover={{ y: -2 }}
          >
            <ArrowUp size={16} />
            Back to Top
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;