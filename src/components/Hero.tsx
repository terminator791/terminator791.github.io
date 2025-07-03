import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ExternalLink, Code, Sparkles } from 'lucide-react';
import TypewriterText from './TypewriterText';
import LazyImage from './LazyImage';

const Hero: React.FC = () => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/documents/Moh Iqbal Bagus P H - POLITEKNIK NEGERI SEMARANG.pdf';
    // link.download = 'Moh Iqbal Bagus P H - POLITEKNIK NEGERI SEMARANG - CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient opacity-5"></div>
      
      {/* Floating elements */}
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
      />
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
      />
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-xl"
      />

      {/* Floating icons */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-32 right-20 text-blue-500/20 hidden lg:block"
      >
        <Code size={40} />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -10, 10, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-32 left-20 text-purple-500/20 hidden lg:block"
      >
        <Sparkles size={35} />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="relative inline-block"
          >
            <LazyImage
                src="/images/iqbal.jpeg"
                alt="Iqbal Bagus"
                className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-blue-500 shadow-2xl"
                placeholder="Loading..."
              />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-full border-2 border-dashed border-blue-400/30"
            />
          </motion.div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-6">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Hi, I'm{' '}
            <motion.span 
              className="gradient-text inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Iqbal Bagus
            </motion.span>
          </motion.h1>
          
          <div className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-400 mb-4 h-16 flex items-center justify-center">
            <span className="mr-2">I'm a</span>
            <TypewriterText
              texts={[
                "Computer Engineering Student",
                "Web Developer",
                "Backend Developer",
                "Learner",
                "Innovation Seeker"
              ]}
              className="gradient-text font-semibold"
            />
          </div>
        </motion.div>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Passionate about building innovative solutions and learning cutting-edge technologies. 
          I transform ideas into reality through code, creating meaningful digital experiences 
          that make a difference.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            onClick={handleDownloadCV}
            className="btn-primary flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Download size={20} />
            </motion.div>
            Download CV
            <motion.div
              className="w-0 group-hover:w-2 h-0.5 bg-white transition-all duration-300"
            />
          </motion.button>
          
          <motion.button
            onClick={scrollToProjects}
            className="btn-secondary flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={20} />
            View My Work
            <motion.div
              className="w-0 group-hover:w-2 h-0.5 bg-blue-600 transition-all duration-300"
            />
          </motion.button>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex justify-center space-x-6"
        >
          {[
            { icon: Github, href: "https://github.com/terminator791", label: "GitHub", color: "hover:text-gray-900 dark:hover:text-white" },
            { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-600" },
            { icon: Mail, href: "mailto:moh.43322016@gmail.com", label: "Email", color: "hover:text-red-500" }
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 ${social.color} transition-all duration-300 group`}
              whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <social.icon size={24} />
              </motion.div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                {social.label}
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center cursor-pointer"
            onClick={() => {
              const element = document.getElementById('about');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
            />
          </motion.div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Scroll to explore</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;