---
sidebar_position: 99
title: Glossary
description: Comprehensive glossary of key terms used throughout the Physical AI book.
keywords:
  - glossary
  - definitions
  - terminology
  - physical ai terms
  - robotics vocabulary
---

# Glossary

A comprehensive reference of key terms used throughout this book. Terms are organized alphabetically for easy lookup.

---

## A

### Actuator
A device that converts electrical signals into physical movement or action. Examples include motors, servos, pneumatic cylinders, and speakers. Actuators are the "muscles" of Physical AI systems.

### Agent
In AI, an autonomous entity that perceives its environment through sensors and acts upon it through actuators to achieve specific goals. An agent can be a robot, software program, or any system that exhibits this sense-act behavior.

### Algorithm
A step-by-step procedure or set of rules for solving a problem or accomplishing a task. In Physical AI, algorithms process sensor data and determine appropriate actions.

### Autonomous
Operating independently without human intervention. An autonomous system can make decisions and take actions based on its programming and sensor inputs without requiring real-time human control.

---

## B

### Behavior-Based Robotics
An approach to robotics where complex behaviors emerge from the interaction of simpler, reactive behaviors rather than from centralized planning. Also known as reactive robotics.

### Braitenberg Vehicle
A concept demonstrating how simple sensor-motor connections can produce apparently intelligent behavior. Named after Valentino Braitenberg, these thought experiments show how reactive systems work.

---

## C

### Closed-Loop Control
A control system that uses feedback from sensors to continuously adjust its outputs and minimize error. The system "closes the loop" by measuring the result of its actions. Contrast with [Open-Loop Control](#open-loop-control).

### Computer Vision
The field of AI focused on enabling machines to interpret and understand visual information from cameras, images, or video. Includes tasks like object detection, recognition, and tracking.

### Control System
A system that manages, commands, directs, or regulates the behavior of other systems or devices. In Physical AI, control systems translate high-level goals into specific actuator commands.

### Cyber-Physical System (CPS)
A system integrating computational algorithms with physical components. Physical AI systems are a type of CPS where the computational component includes artificial intelligence.

---

## D

### Dead Reckoning
A navigation method that estimates current position based on a previously known position, speed, and direction of travel. Accumulates error over time without external reference.

### Degrees of Freedom (DOF)
The number of independent parameters that define the configuration of a mechanical system. A robotic arm with 6 DOF can position its end effector at any point and orientation in 3D space.

### Differential Drive
A drive system using two independently driven wheels on either side of a robot. Steering is achieved by varying the relative speeds of the wheels.

---

## E

### Embodied AI
Artificial intelligence that has a physical presence and interacts with the real world through sensors and actuators. Physical AI is synonymous with embodied AI.

### Encoder
A sensor that measures the position, speed, or direction of a motor or wheel. Used for precise movement control and odometry.

### End Effector
The device at the end of a robotic arm that interacts with the environment. Examples include grippers, welding torches, spray guns, or suction cups.

---

## F

### Feedback
Information about the results of an action that is returned to the system to inform future actions. Essential for closed-loop control and learning.

### Finite State Machine (FSM)
A computational model where a system can be in one of a finite number of states at any time. Transitions between states occur based on inputs or conditions. Commonly used for robot behavior design.

### Forward Kinematics
Calculating the position and orientation of a robot's end effector given the joint angles. The opposite of [Inverse Kinematics](#inverse-kinematics).

---

## G

### GPS (Global Positioning System)
A satellite-based navigation system providing location and time information. Commonly used in outdoor Physical AI applications like autonomous vehicles and drones.

### Gripper
An end effector designed to grasp and manipulate objects. Types include parallel jaw grippers, vacuum grippers, and soft grippers.

---

## H

### Heuristic
A practical problem-solving approach that may not be optimal but is sufficient for immediate goals. Used when exact solutions are computationally expensive or impossible.

### Human-Robot Interaction (HRI)
The study and design of interactions between humans and robots. Includes physical collaboration, communication, and safety considerations.

---

## I

### IMU (Inertial Measurement Unit)
A sensor package that typically includes accelerometers and gyroscopes to measure acceleration and angular velocity. Used for orientation tracking and motion detection.

### Inverse Kinematics
Calculating the joint angles required to position a robot's end effector at a desired location. The opposite of [Forward Kinematics](#forward-kinematics).

---

## K

### Kalman Filter
A mathematical algorithm that uses a series of measurements over time to estimate unknown variables. Commonly used for sensor fusion and state estimation in robotics.

### Kinematics
The study of motion without considering the forces that cause it. In robotics, kinematics describes the relationship between joint positions and end effector position.

---

## L

### LIDAR (Light Detection and Ranging)
A sensing method using laser light to measure distances and create detailed 3D maps of environments. Essential for many autonomous vehicles and mobile robots.

### Localization
The process of determining a robot's position and orientation within its environment. Often combined with mapping in SLAM.

---

## M

### Machine Learning (ML)
A subset of AI where systems learn from data to improve performance without being explicitly programmed. Used in Physical AI for perception, decision-making, and control.

### Manipulator
A robotic arm designed to manipulate objects in its environment. Consists of links connected by joints, ending in an [End Effector](#end-effector).

### Mapping
Creating a representation of the environment based on sensor data. Often combined with localization in [SLAM](#slam-simultaneous-localization-and-mapping).

### Mobile Robot
A robot capable of moving through its environment, as opposed to a fixed manipulator. Includes wheeled robots, legged robots, and drones.

---

## N

### Navigation
The process of determining a path from one location to another and following that path. Includes path planning, obstacle avoidance, and localization.

### Neural Network
A computing system inspired by biological neural networks, consisting of interconnected nodes that process information. Used in deep learning applications within Physical AI.

---

## O

### Obstacle Avoidance
The capability of detecting and maneuvering around obstacles in the robot's path. A fundamental requirement for mobile robots.

### Odometry
Using data from motion sensors (like wheel encoders) to estimate a robot's change in position over time. Subject to cumulative error (drift).

### Open-Loop Control
A control system that operates without feedback, executing pre-programmed commands without sensing the results. Contrast with [Closed-Loop Control](#closed-loop-control).

---

## P

### Path Planning
The computational problem of finding a route between two points, typically while avoiding obstacles. Algorithms include A*, Dijkstra's, and RRT.

### Perception
The ability of a Physical AI system to gather and interpret information about its environment through sensors. One of the four pillars of Physical AI.

### Physical AI
Artificial intelligence systems that interact with the physical world through sensors and actuators. Includes robots, autonomous vehicles, drones, and smart devices.

### PID Controller
Proportional-Integral-Derivative controller—a control loop mechanism that calculates an error value and applies a correction based on proportional, integral, and derivative terms.

### Pose
The position and orientation of an object in space. For a robot, pose typically includes x, y, z coordinates and roll, pitch, yaw angles.

---

## R

### Real-Time System
A system where the correctness of operations depends not only on logical correctness but also on the time at which they are performed. Critical for Physical AI safety.

### Reinforcement Learning (RL)
A type of machine learning where an agent learns to make decisions by receiving rewards or penalties for its actions. Commonly used for robot control and navigation.

### ROS (Robot Operating System)
An open-source framework providing tools, libraries, and conventions for building robot software. Despite the name, it's middleware rather than an operating system.

---

## S

### Sensor
A device that detects and measures physical properties of the environment. Examples include cameras, microphones, touch sensors, LIDAR, and GPS receivers.

### Sensor Fusion
The process of combining data from multiple sensors to produce more accurate, reliable, or complete information than any single sensor could provide alone.

### Servo Motor
A motor with built-in position feedback, allowing precise control of angular position, velocity, and acceleration. Common in robotic joints.

### SLAM (Simultaneous Localization and Mapping)
A technique where a robot builds a map of an unknown environment while simultaneously tracking its own location within that map.

### State
The complete description of a system at a given moment in time. In robotics, includes position, velocity, and any other relevant variables.

### State Machine
See [Finite State Machine](#finite-state-machine-fsm).

### Stepper Motor
A motor that divides rotation into discrete steps, allowing precise position control without feedback. Common in 3D printers and CNC machines.

---

## T

### Teleoperation
Remote control of a robot by a human operator. Often used for training, in dangerous environments, or when full autonomy isn't possible.

### Torque
A rotational force that causes an object to rotate around an axis. Important for motor selection and robot arm design.

---

## U

### Ultrasonic Sensor
A sensor that uses sound waves to measure distance to objects. Common in mobile robots for obstacle detection.

---

## W

### Waypoint
A specific location that a robot navigates to or through. A path is often defined as a series of waypoints.

### Workspace
The volume of space that a robot can reach with its end effector. Defined by the robot's kinematics.

---

## Quick Reference by Chapter

| Chapter | Key Terms |
|---------|-----------|
| 1. Foundations | Physical AI, Agent, Sense-Think-Act, Embodied AI |
| 2. Perception | Sensor, Computer Vision, LIDAR, Sensor Fusion, IMU |
| 3. Reasoning | State Machine, Path Planning, Algorithm, Heuristic |
| 4. Actuation | Actuator, Motor, Servo, PID Controller, Kinematics |
| 5. Learning | Machine Learning, Reinforcement Learning, Neural Network |
| 6. Integration | ROS, SLAM, Real-Time System, Control System |
| 7. Ethics | Autonomous, Human-Robot Interaction |

---

*Can't find a term? [Suggest an addition](https://github.com/your-org/physical-ai-book/issues) to the glossary.*
