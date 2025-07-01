import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, Target, Heart, Code, Lightbulb, Users, Calendar, Award } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import AchievementBadge from './AchievementBadge';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
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
            About Me
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Passionate about technology, innovation, and continuous learning
          </motion.p>
        </motion.div>

        {/* Achievement Badges */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <AchievementBadge
            title="Quick Learner"
            description="Rapidly adapts to new technologies and frameworks"
            type="star"
            delay={0.2}
          />
          <AchievementBadge
            title="Problem Solver"
            description="Excels at finding innovative solutions to complex challenges"
            type="target"
            delay={0.4}
          />
          <AchievementBadge
            title="Team Player"
            description="Collaborates effectively in diverse team environments"
            type="award"
            delay={0.6}
          />
          <AchievementBadge
            title="Innovation Driven"
            description="Constantly seeks new ways to improve and innovate"
            type="trophy"
            delay={0.8}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              I'm <span className="font-semibold gradient-text">Iqbal Bagus</span>, a dedicated Informatics and Computer Engineering student with a passion for 
              solving complex problems through innovative technology solutions. My journey in 
              web developer and computer science has equipped me with both theoretical knowledge                  and practical skills in software development.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              Known for my <span className="font-semibold text-blue-600 dark:text-blue-400">intelligence and eagerness to learn</span>, I thrive in environments that 
              challenge me to grow professionally. I'm particularly interested in working with 
              both startups and established corporations to contribute to meaningful projects 
              that make a real impact.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-4"
            >
              {[
                { text: "Problem Solver", color: "from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900" },
                { text: "Quick Learner", color: "from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900" }, 
                { text: "Team Player", color: "from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900" },
                { text: "Innovation Driven", color: "from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900" }
              ].map((trait, index) => (
                <motion.span
                  key={trait.text}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-4 py-2 bg-gradient-to-r ${trait.color} text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700 cursor-default`}
                >
                  {trait.text}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {[
              {
                icon: User,
                title: "Who I Am",
                description: "A curious and driven computer engineering student who believes in the power of technology to solve real-world problems.",
                color: "blue",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Target,
                title: "My Goals",
                description: "To contribute to innovative projects in both startup and corporate environments, continuously learning and growing as a developer.",
                color: "green",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: Heart,
                title: "What I Love",
                description: "Learning new technologies, tackling challenging problems, and collaborating with talented teams to build amazing products.",
                color: "red",
                gradient: "from-red-500 to-pink-500"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5, rotateY: 5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`p-3 bg-gradient-to-r ${item.gradient} rounded-lg text-white shadow-lg group-hover:shadow-xl`}
                  >
                    <item.icon className="w-6 h-6" />
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                      whileHover={{ x: 5 }}
                    >
                      {item.title}
                    </motion.h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <AnimatedCounter
            end={5}
            suffix="+"
            label="Projects Completed"
            icon={<Code size={24} />}
          />
          <AnimatedCounter
            end={10}
            suffix="+"
            label="Technologies Mastered"
            icon={<Lightbulb size={24} />}
          />
          <AnimatedCounter
            end={5}
            suffix="+"
            label="Team Collaborations"
            icon={<Users size={24} />}
          />
          <AnimatedCounter
            end={2}
            suffix="+"
            label="Years Learning"
            icon={<Calendar size={24} />}
          />
        </motion.div>

        {/* Personal Story */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-800"
        >
          <motion.h3 
            className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="w-6 h-6 text-blue-600" />
            My Journey
          </motion.h3>
          <motion.p 
            className="text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-4xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            My journey in technology began with curiosity and has evolved into a passion for creating 
            meaningful digital experiences. From my early days exploring programming concepts to building 
            complex web applications, I've consistently pushed myself to learn, grow, and contribute to 
            projects that matter. Every challenge is an opportunity to innovate, and every project is 
            a chance to make a positive impact.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;