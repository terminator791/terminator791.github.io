import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Globe, Wrench, Smartphone, Cloud } from 'lucide-react';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "JavaScript", level: "Intermediate", color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200" },
        { name: "TypeScript", level: "Learning", color: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" },
        { name: "Python", level: "Intermediate", color: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" },
        { name: "Java", level: "Learning", color: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200" },
        { name: "PHP", level: "Intermediate", color: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200" },
      ]
    },
    {
      title: "Web Technologies",
      icon: <Globe className="w-6 h-6" />,
      skills: [
        { name: "Laravel", level: "Advanced", color: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200" },
        { name: "React", level: "Learning", color: "bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200" },
        { name: "HTML/CSS", level: "Intermediate", color: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200" },
        { name: "Express js", level: "Learning", color: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" },
        { name: "Tailwind CSS", level: "Learning", color: "bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200" }
      ]
    },
    {
      title: "Databases & Backend",
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: "MySQL", level: "Intermediate", color: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" },
        { name: "PostgreSQL", level: "Learning", color: "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200" },
        { name: "MongoDB", level: "Learning", color: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" },
        { name: "REST APIs", level: "Advanced", color: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200" },
        { name: "Firebase", level: "Learning", color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200" }
      ]
    },
    {
      title: "Tools & Technologies",
      icon: <Wrench className="w-6 h-6" />,
      skills: [
        { name: "Git", level: "Intermediate", color: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200" },
        { name: "Docker", level: "Learning", color: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" },
        { name: "VS Code", level: "Advanced", color: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" },
        { name: "Postman", level: "Advanced", color: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200" }
      ]
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="w-6 h-6" />,
      skills: [
        { name: "Flutter", level: "Learning", color: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" },
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6" />,
      skills: [
        { name: "AWS", level: "Learning", color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200" },
        { name: "Netlify", level: "Learning", color: "bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200" }
      ]
    }
  ];

  const getLevelIndicator = (level: string) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border";
    
    switch (level) {
      case "Advanced":
        return `${baseClasses} bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700`;
      case "Intermediate":
        return `${baseClasses} bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700`;
      case "Learning":
        return `${baseClasses} bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700`;
      default:
        return `${baseClasses} bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700`;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Skills & Technologies
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            My technical toolkit and proficiency levels across different domains
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400"
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + skillIndex * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {skill.name}
                    </span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.7 + skillIndex * 0.1, type: "spring", stiffness: 200 }}
                      className={getLevelIndicator(skill.level)}
                    >
                      {skill.level}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-800"
        >
          <motion.h3 
            className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center"
            whileHover={{ scale: 1.05 }}
          >
            Professional Skills
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Problem Solving",
              "Team Collaboration", 
              "Hard Work",
              "Time Management",
              "Critical Thinking",
              "Adaptability",
              "Work Ethics",
              "Project Management"
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Goals */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.h4 
            className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Currently Learning & Exploring
          </motion.h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Machine Learning",
              "Cloud Computing",
              "GraphQL",
              "Microservices",
              "DevOps",
              "AI/ML"
            ].map((topic, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0, y: 20 }}
                animate={inView ? { scale: 1, y: 0 } : { scale: 0, y: 20 }}
                transition={{ delay: 1.4 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-700 cursor-default"
              >
                {topic}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;