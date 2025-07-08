"use client";

import React, { useState } from 'react';

const AboutUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '3rem 2rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 800, 
            marginBottom: '1rem', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome to DataInYourself
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Your journey to career success starts here! 🚀
          </p>
        </div>

        {/* Mission Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '3rem',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
            Our Mission
          </h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.7', opacity: 0.95 }}>
            We're here to <strong>empower you</strong> with job-ready digital and technical skills that today's employers are looking for. 
            Think of us as your personal career coach, guiding you from learning to earning! 💼
          </p>
        </div>

        {/* What We Offer */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '2.2rem', 
            fontWeight: 700, 
            marginBottom: '1.5rem', 
            color: '#333',
            textAlign: 'center'
          }}>
            What Makes Us Special ✨
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{ 
              background: '#f8f9ff', 
              padding: '2rem', 
              borderRadius: '15px', 
              border: '2px solid #e3f2fd'
            }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#1976d2', marginBottom: '1rem' }}>
                🎯 Expert-Designed Courses
              </h3>
              <p style={{ color: '#555', lineHeight: '1.6' }}>
                Our courses are crafted by industry professionals who know exactly what skills you need to succeed in today's job market.
              </p>
            </div>
            <div style={{ 
              background: '#fff8f0', 
              padding: '2rem', 
              borderRadius: '15px', 
              border: '2px solid #ffe0b2'
            }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#f57c00', marginBottom: '1rem' }}>
                🚀 Career-Focused Learning
              </h3>
              <p style={{ color: '#555', lineHeight: '1.6' }}>
                We focus on practical skills that employers actually want, not just theory. Get ready to hit the ground running!
              </p>
            </div>
            <div style={{ 
              background: '#f0f8f0', 
              padding: '2rem', 
              borderRadius: '15px', 
              border: '2px solid #c8e6c9'
            }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#388e3c', marginBottom: '1rem' }}>
                🤝 Placement Support
              </h3>
              <p style={{ color: '#555', lineHeight: '1.6' }}>
                We don't just teach you skills - we help you land your dream job with comprehensive placement assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Course Catalog */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '2.2rem', 
            fontWeight: 700, 
            marginBottom: '1.5rem', 
            color: '#333',
            textAlign: 'center'
          }}>
            Explore Our Course Catalog 📚
          </h2>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.1rem', 
            color: '#666', 
            marginBottom: '2rem',
            maxWidth: '700px',
            margin: '0 auto 2rem'
          }}>
            From data analysis to web development, we've got courses for every career path. Choose your journey below!
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              { name: 'Data Analyst', duration: '3-4 months', emoji: '📊' },
              { name: 'Business Analyst', duration: '3-4 months', emoji: '💼' },
              { name: 'Data Science', duration: '4-5 months', emoji: '🔬' },
              { name: 'SQL Analyst', duration: '1 month', emoji: '🗄️' },
              { name: 'Machine Learning', duration: '1 month', emoji: '🤖' },
              { name: 'Python for Beginners', duration: '1 month', emoji: '🐍' },
              { name: 'Power BI / Tableau', duration: '1 month', emoji: '📈' },
              { name: 'Digital Marketing', duration: '2-3 months', emoji: '📱' },
              { name: 'Placement Ready', duration: '1 month', emoji: '🎯' },
              { name: 'Web Developer', duration: '3 months', emoji: '💻' },
              { name: 'Cyber Security', duration: '3 months', emoji: '🔒' },
              { name: 'Cloud Engineer', duration: '2 months', emoji: '☁️' },
              { name: 'Prompt Engineer', duration: '3 months', emoji: '🤖' },
              { name: 'Product Management', duration: '3 months', emoji: '📋' },
              { name: 'Finance Analyst', duration: '3 months', emoji: '💰' },
              { name: 'AutoCAD AutoDesk', duration: '1-2 months', emoji: '🏗️' },
              { name: 'Autodesk Revit', duration: '1-2 months', emoji: '🏢' },
              { name: 'STAAD Pro', duration: '1-2 months', emoji: '⚡' }
            ].map((course, index) => (
              <div key={index} style={{ 
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid ${hoveredIndex === index ? '#667eea' : '#e0e0e0'}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textAlign: 'center',
                transform: hoveredIndex === index ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: hoveredIndex === index ? '0 10px 25px rgba(0,0,0,0.1)' : 'none'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{course.emoji}</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '0.5rem' }}>
                  {course.name}
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>{course.duration}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <div style={{ 
          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          borderRadius: '15px',
          padding: '2.5rem',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: '#333' }}>
            Our Story 📖
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: '1.8', 
            color: '#555',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Founded by passionate educators and industry professionals, DataInYourself was born from a simple belief: 
            <strong> everyone deserves access to world-class, career-focused education</strong>. 
            We're not just another online learning platform - we're your partners in success, 
            committed to supporting you at every step of your journey. 🌟
          </p>
        </div>

        {/* Call to Action */}
        <div style={{ 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '15px',
          padding: '3rem',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Ready to Transform Your Career? 🚀
          </h2>
          <p style={{ fontSize: '1.3rem', marginBottom: '2rem', opacity: 0.9 }}>
            Join thousands of learners who have already taken the first step towards their dream careers!
          </p>
          <button style={{ 
            background: 'white',
            color: '#667eea',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '50px',
            fontSize: '1.2rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
          }}>
            Start Your Journey Today! ✨
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 