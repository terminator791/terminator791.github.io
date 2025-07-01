import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap } from 'lucide-react';
import Timeline from './Timeline';

const Studies: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const educationData = [
    {
      id: 'polines',
      title: "Study in Informatics and Computer Engineering",
      organization: "Politeknik Negeri Semarang",
      period: "2022 - now",
      location: "Semarang, Central java",
      description: "Focused on software engineering, web developer, data structures, and system design. Maintained strong academic performance while working on various practical projects that bridge theory with real-world applications.",
      highlights: [
        "Maintained GPA of 3.90/4.00 throughout academic journey",
        "Specialized in Data Analyst & Web Developer, Software Engineering",
        "Developed strong foundation in Web Developer and Data Analysis",
        "Led multiple successful Web development projects",
        "Participated in collaborative learning environments and team projects"
      ],
      type: 'education' as const
    },
     {
      id: 'smk',
      title: "Graduated from Computer and Network Engineering Schools",
      organization: "SMK Negeri 1 Rembang",
      period: "2019 - 2022",
      location: "Rembang, Central Java",
      description: "Specialized in Computer and Network Engineering with a strong focus on practical skills and foundational programming.",
      highlights: [
        "Achieved top academic ranking in school",
        "Built a strong foundation in programming and networking",
      ],
      type: 'education' as const
    }
  ];

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

  return (
    <section id="studies" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white shadow-lg"
            >
              <GraduationCap className="w-8 h-8" />
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
            >
              Education & Studies
            </motion.h2>
          </motion.div>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            My academic journey and continuous learning path in computer engineering
          </motion.p>
        </motion.div>

        <Timeline 
          items={educationData}
          title="Academic Excellence"
        />

        {/* Learning Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-800"
        >
          <motion.h3 
            className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center"
            whileHover={{ scale: 1.05 }}
          >
            Learning Philosophy
          </motion.h3>
          <motion.p 
            className="text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-4xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            I believe in continuous learning and staying updated with the latest technologies. 
            My approach combines solid theoretical foundations with hands-on practical experience, 
            always seeking to understand not just the "how" but also the "why" behind every concept. 
            This philosophy has enabled me to maintain academic excellence while building real-world 
            applications that solve meaningful problems.
          </motion.p>
        </motion.div>

        {/* Key Subjects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12"
        >
          <motion.h4 
            className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center"
            whileHover={{ scale: 1.05 }}
          >
            Core Subjects Learned
          </motion.h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Data Structures & Algorithms",
              "Software Engineering",
              "Database Systems",
              "Computer Networks",
              "Operating Systems",
              "Web Development",
              "Mobile Development",
              "System & Data Analysis"
            ].map((subject, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ delay: 1.4 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                  {subject}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Studies;