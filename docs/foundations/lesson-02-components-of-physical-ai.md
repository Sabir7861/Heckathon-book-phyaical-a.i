---
sidebar_position: 2
title: "Components of Physical AI Systems"
description: "Deep dive into the four pillars of Physical AI: perception, reasoning, actuation, and learning. Understand how these components work together."
keywords:
  - perception
  - reasoning
  - actuation
  - learning
  - sensors
  - actuators
  - robotics components
image: /img/og/ch01-l02-components.png
---

# Components of Physical AI Systems

<div className="lesson-progress">
📖 **Chapter 1** · Lesson 2 of 3 · ⏱️ 60 minutes
</div>

## Learning Objectives

By the end of this lesson, you will be able to:

- [ ] Explain the four pillars of Physical AI (perception, reasoning, actuation, learning)
- [ ] Identify common sensors and their applications
- [ ] Understand different types of actuators and when to use them
- [ ] Describe how the four pillars work together in a complete system

## Prerequisites

Before starting this lesson, you should have:

- Completed [Lesson 1.1: What is Physical AI?](/docs/01-foundations/lesson-01-what-is-physical-ai)
- Basic understanding of the Sense-Think-Act cycle

## Introduction

In our previous lesson, we learned that Physical AI systems interact with the real world through sensors and actuators. But what exactly are these components? How do they work? And how do they combine to create intelligent behavior?

This lesson takes a deep dive into the **four pillars** that support every Physical AI system. Think of these as the essential building blocks—just as a house needs a foundation, walls, roof, and utilities, a Physical AI system needs perception, reasoning, actuation, and learning. Understanding each pillar will help you design better systems and troubleshoot problems when things go wrong.

By the end of this lesson, you'll have a comprehensive mental model of how Physical AI systems are constructed, from individual components to integrated architectures.

:::tip Why This Matters
Whether you're building a simple robot or working on autonomous vehicles, these four pillars remain constant. Mastering them gives you a framework for understanding any Physical AI system you encounter.
:::

---

## The Four Pillars Framework

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PHYSICAL AI ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                        ┌─────────────┐                              │
│                        │   LEARNING  │                              │
│                        │  (Improve)  │                              │
│                        └──────┬──────┘                              │
│                               │                                     │
│                               ▼                                     │
│   ┌─────────────┐      ┌─────────────┐      ┌─────────────┐        │
│   │ PERCEPTION  │ ───► │  REASONING  │ ───► │  ACTUATION  │        │
│   │  (Sense)    │      │   (Think)   │      │    (Act)    │        │
│   └─────────────┘      └─────────────┘      └─────────────┘        │
│         ▲                                          │               │
│         │                                          │               │
│         └──────────── ENVIRONMENT ─────────────────┘               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

Let's explore each pillar in detail.

---

## Pillar 1: Perception

**Perception** is how a Physical AI system gathers information about its environment. It answers the question: "What's happening around me?"

### Common Sensor Types

| Sensor Type | What It Measures | Common Uses | Range/Precision |
|-------------|------------------|-------------|-----------------|
| **Camera** | Visual imagery | Object detection, navigation | cm to km |
| **LIDAR** | Distance via laser | 3D mapping, obstacle detection | cm to 200m |
| **Ultrasonic** | Distance via sound | Proximity sensing | 2cm to 4m |
| **IMU** | Acceleration, rotation | Orientation, motion tracking | High precision |
| **GPS** | Global position | Outdoor navigation | 1-10m accuracy |
| **Infrared** | Heat/proximity | Line following, presence | cm to m |
| **Touch/Force** | Physical contact | Manipulation, safety | Direct contact |
| **Microphone** | Sound waves | Voice commands, localization | Room-scale |

### Camera Systems

Cameras are the most versatile sensors, providing rich visual information:

```python
"""
Example: Basic camera perception with OpenCV
Demonstrates how robots "see" the world
"""

import cv2
import numpy as np

def basic_camera_perception():
    """
    Capture and process a frame from a camera.
    This is the foundation of visual perception.
    """
    # Initialize camera (0 = default webcam)
    camera = cv2.VideoCapture(0)

    # Capture a single frame
    success, frame = camera.read()

    if success:
        # Convert to different color spaces for analysis
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

        # Basic image statistics (what the robot "perceives")
        brightness = np.mean(gray)

        print(f"Frame size: {frame.shape}")
        print(f"Average brightness: {brightness:.2f}")

        # Detect edges (finding object boundaries)
        edges = cv2.Canny(gray, 50, 150)
        edge_count = np.sum(edges > 0)
        print(f"Edge pixels detected: {edge_count}")

    camera.release()
    return frame

# Note: Run this only if you have a camera connected
# frame = basic_camera_perception()
```

### Distance Sensors

For spatial awareness, distance sensors are crucial:

```python
"""
Example: Simulated distance sensor array
Shows how robots perceive obstacles around them
"""

import math
import random

class DistanceSensorArray:
    """
    Simulates an array of ultrasonic sensors around a robot.
    Real robots often have 4-8 sensors for 360° coverage.
    """

    def __init__(self, num_sensors=8, max_range=4.0):
        self.num_sensors = num_sensors
        self.max_range = max_range  # meters
        # Angles for each sensor (evenly distributed)
        self.angles = [i * (360 / num_sensors) for i in range(num_sensors)]

    def read_all(self, obstacles):
        """
        Get readings from all sensors given obstacle positions.

        Args:
            obstacles: List of (x, y, radius) tuples

        Returns:
            Dictionary of sensor readings
        """
        readings = {}
        for i, angle in enumerate(self.angles):
            # Simulate ray casting to find nearest obstacle
            distance = self._cast_ray(angle, obstacles)
            readings[f"sensor_{i}"] = {
                'angle': angle,
                'distance': distance,
                'blocked': distance < self.max_range
            }
        return readings

    def _cast_ray(self, angle, obstacles):
        """Simulate a single sensor ray."""
        # Simplified: return random distance for simulation
        # Real implementation would do actual ray-obstacle intersection
        return random.uniform(0.5, self.max_range)

    def get_danger_zones(self, readings, threshold=0.5):
        """Identify which directions have close obstacles."""
        dangers = []
        for sensor_id, data in readings.items():
            if data['distance'] < threshold:
                dangers.append(data['angle'])
        return dangers


# Example usage
sensors = DistanceSensorArray(num_sensors=8)
obstacles = [(1.0, 0.5, 0.2), (0.3, -0.8, 0.1)]  # x, y, radius
readings = sensors.read_all(obstacles)

print("Sensor Readings:")
for sensor_id, data in readings.items():
    status = "BLOCKED" if data['blocked'] else "clear"
    print(f"  {sensor_id}: {data['distance']:.2f}m at {data['angle']}° [{status}]")
```

### Sensor Fusion

Real systems combine multiple sensors for reliability:

```python
"""
Example: Simple sensor fusion
Combining multiple sensors for better estimates
"""

class SensorFusion:
    """
    Combines readings from multiple sensors to get
    a more reliable estimate of the environment.
    """

    def __init__(self):
        self.weights = {
            'camera': 0.4,
            'lidar': 0.35,
            'ultrasonic': 0.25
        }

    def fuse_distance_estimates(self, camera_dist, lidar_dist, ultrasonic_dist):
        """
        Weighted average of distance estimates from multiple sensors.

        In practice, more sophisticated methods like Kalman filters
        are used, but this demonstrates the concept.
        """
        fused = (
            self.weights['camera'] * camera_dist +
            self.weights['lidar'] * lidar_dist +
            self.weights['ultrasonic'] * ultrasonic_dist
        )

        # Calculate confidence based on agreement
        estimates = [camera_dist, lidar_dist, ultrasonic_dist]
        variance = sum((e - fused)**2 for e in estimates) / len(estimates)
        confidence = 1 / (1 + variance)  # Higher agreement = higher confidence

        return {
            'distance': fused,
            'confidence': confidence,
            'sources': {
                'camera': camera_dist,
                'lidar': lidar_dist,
                'ultrasonic': ultrasonic_dist
            }
        }


# Example
fusion = SensorFusion()
result = fusion.fuse_distance_estimates(
    camera_dist=2.3,
    lidar_dist=2.1,
    ultrasonic_dist=2.4
)
print(f"Fused distance: {result['distance']:.2f}m")
print(f"Confidence: {result['confidence']:.2%}")
```

---

## Pillar 2: Reasoning

**Reasoning** is how a Physical AI system processes information and makes decisions. It answers: "What should I do?"

### Levels of Reasoning

```
┌─────────────────────────────────────────────────────────┐
│                   REASONING HIERARCHY                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  HIGH LEVEL    ┌─────────────────────────────────┐     │
│  (Strategic)   │  Mission Planning               │     │
│                │  "Deliver package to Room 301"  │     │
│                └─────────────────────────────────┘     │
│                              │                          │
│  MID LEVEL                   ▼                          │
│  (Tactical)    ┌─────────────────────────────────┐     │
│                │  Path Planning                  │     │
│                │  "Navigate through hallway B"   │     │
│                └─────────────────────────────────┘     │
│                              │                          │
│  LOW LEVEL                   ▼                          │
│  (Reactive)    ┌─────────────────────────────────┐     │
│                │  Behavior Control               │     │
│                │  "Avoid obstacle on left"       │     │
│                └─────────────────────────────────┘     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### State Machine Implementation

State machines are fundamental to robot reasoning:

```python
"""
Example: Finite State Machine for Robot Behavior
A common pattern for implementing robot reasoning
"""

from enum import Enum, auto

class RobotState(Enum):
    """Possible states for our robot."""
    IDLE = auto()
    SEARCHING = auto()
    APPROACHING = auto()
    GRABBING = auto()
    RETURNING = auto()
    ERROR = auto()

class RobotStateMachine:
    """
    A state machine controlling a simple fetch robot.

    The robot:
    1. Starts IDLE
    2. SEARCHES for an object
    3. APPROACHES the object when found
    4. GRABS the object
    5. RETURNS to home position
    """

    def __init__(self):
        self.state = RobotState.IDLE
        self.target_found = False
        self.target_reached = False
        self.object_grabbed = False
        self.at_home = False

    def update(self, sensor_data):
        """
        Main reasoning loop - called every cycle.

        Args:
            sensor_data: Dictionary with sensor readings
        """
        # State transition logic
        if self.state == RobotState.IDLE:
            self._handle_idle(sensor_data)

        elif self.state == RobotState.SEARCHING:
            self._handle_searching(sensor_data)

        elif self.state == RobotState.APPROACHING:
            self._handle_approaching(sensor_data)

        elif self.state == RobotState.GRABBING:
            self._handle_grabbing(sensor_data)

        elif self.state == RobotState.RETURNING:
            self._handle_returning(sensor_data)

        return self.state

    def _handle_idle(self, sensor_data):
        """IDLE: Wait for command to start."""
        if sensor_data.get('start_command', False):
            print("Starting search...")
            self.state = RobotState.SEARCHING

    def _handle_searching(self, sensor_data):
        """SEARCHING: Look for target object."""
        if sensor_data.get('target_visible', False):
            print("Target found! Approaching...")
            self.target_found = True
            self.state = RobotState.APPROACHING
        # Continue searching behavior

    def _handle_approaching(self, sensor_data):
        """APPROACHING: Move toward target."""
        distance = sensor_data.get('target_distance', float('inf'))
        if distance < 0.1:  # Within grabbing range
            print("Target reached! Grabbing...")
            self.target_reached = True
            self.state = RobotState.GRABBING
        elif not sensor_data.get('target_visible', True):
            print("Lost target! Resuming search...")
            self.state = RobotState.SEARCHING

    def _handle_grabbing(self, sensor_data):
        """GRABBING: Pick up the object."""
        if sensor_data.get('gripper_closed', False):
            print("Object secured! Returning home...")
            self.object_grabbed = True
            self.state = RobotState.RETURNING

    def _handle_returning(self, sensor_data):
        """RETURNING: Go back to starting position."""
        if sensor_data.get('at_home', False):
            print("Mission complete!")
            self.at_home = True
            self.state = RobotState.IDLE

    def get_action(self):
        """
        Return the appropriate action for current state.
        This connects reasoning to actuation.
        """
        actions = {
            RobotState.IDLE: 'wait',
            RobotState.SEARCHING: 'rotate_and_scan',
            RobotState.APPROACHING: 'move_to_target',
            RobotState.GRABBING: 'close_gripper',
            RobotState.RETURNING: 'move_to_home',
            RobotState.ERROR: 'stop_and_alert'
        }
        return actions.get(self.state, 'stop')


# Example simulation
robot = RobotStateMachine()

# Simulate a mission
test_sequence = [
    {'start_command': True},
    {'target_visible': False},
    {'target_visible': False},
    {'target_visible': True, 'target_distance': 2.0},
    {'target_visible': True, 'target_distance': 1.0},
    {'target_visible': True, 'target_distance': 0.05},
    {'gripper_closed': True},
    {'at_home': False},
    {'at_home': True}
]

print("=== Robot State Machine Demo ===\n")
for i, sensor_data in enumerate(test_sequence):
    state = robot.update(sensor_data)
    action = robot.get_action()
    print(f"Step {i}: State={state.name}, Action={action}")
```

---

## Pillar 3: Actuation

**Actuation** is how a Physical AI system affects the physical world. It answers: "How do I do it?"

### Common Actuator Types

| Actuator Type | Motion Type | Precision | Speed | Use Cases |
|---------------|-------------|-----------|-------|-----------|
| **DC Motor** | Continuous rotation | Low | High | Wheels, fans |
| **Servo Motor** | Angular position | High | Medium | Robot joints, steering |
| **Stepper Motor** | Discrete steps | Very High | Low | CNC, 3D printers |
| **Linear Actuator** | Straight line | Medium | Low | Lifts, doors |
| **Pneumatic** | Fast linear | Low | Very High | Grippers, presses |

### Motor Control Example

```python
"""
Example: Simulated motor control system
Demonstrates how Physical AI systems control movement
"""

import math
import time

class SimulatedMotor:
    """
    A simulated DC motor with basic physics.
    Real motors have inertia, friction, and response delays.
    """

    def __init__(self, name, max_speed=100):
        self.name = name
        self.max_speed = max_speed  # RPM
        self.current_speed = 0
        self.target_speed = 0
        self.acceleration = 50  # RPM per second

    def set_speed(self, speed):
        """Set target speed (will ramp to it)."""
        self.target_speed = max(-self.max_speed, min(self.max_speed, speed))

    def update(self, dt):
        """
        Update motor state based on time elapsed.

        Args:
            dt: Time delta in seconds
        """
        # Gradually change speed toward target (simulates inertia)
        speed_diff = self.target_speed - self.current_speed
        max_change = self.acceleration * dt

        if abs(speed_diff) <= max_change:
            self.current_speed = self.target_speed
        else:
            self.current_speed += math.copysign(max_change, speed_diff)

    def get_status(self):
        return {
            'name': self.name,
            'current_speed': self.current_speed,
            'target_speed': self.target_speed,
            'at_target': abs(self.current_speed - self.target_speed) < 0.1
        }


class DifferentialDrive:
    """
    A differential drive robot with two motors.
    Common in mobile robots for simple, effective steering.
    """

    def __init__(self, wheel_radius=0.05, wheel_base=0.2):
        self.left_motor = SimulatedMotor("left")
        self.right_motor = SimulatedMotor("right")
        self.wheel_radius = wheel_radius  # meters
        self.wheel_base = wheel_base  # meters between wheels

        # Robot position and orientation
        self.x = 0
        self.y = 0
        self.theta = 0  # radians

    def set_velocity(self, linear, angular):
        """
        Set robot velocity using linear and angular components.

        Args:
            linear: Forward speed (m/s)
            angular: Rotation speed (rad/s)
        """
        # Convert to individual wheel speeds
        # v_left = linear - (angular * wheel_base / 2)
        # v_right = linear + (angular * wheel_base / 2)

        v_left = linear - (angular * self.wheel_base / 2)
        v_right = linear + (angular * self.wheel_base / 2)

        # Convert m/s to RPM
        rpm_left = (v_left / (2 * math.pi * self.wheel_radius)) * 60
        rpm_right = (v_right / (2 * math.pi * self.wheel_radius)) * 60

        self.left_motor.set_speed(rpm_left)
        self.right_motor.set_speed(rpm_right)

    def update(self, dt):
        """Update robot position based on motor speeds."""
        self.left_motor.update(dt)
        self.right_motor.update(dt)

        # Convert RPM back to m/s
        v_left = (self.left_motor.current_speed / 60) * 2 * math.pi * self.wheel_radius
        v_right = (self.right_motor.current_speed / 60) * 2 * math.pi * self.wheel_radius

        # Calculate robot velocity
        linear = (v_left + v_right) / 2
        angular = (v_right - v_left) / self.wheel_base

        # Update position
        self.x += linear * math.cos(self.theta) * dt
        self.y += linear * math.sin(self.theta) * dt
        self.theta += angular * dt

    def get_pose(self):
        return {
            'x': self.x,
            'y': self.y,
            'theta': math.degrees(self.theta),
            'left_speed': self.left_motor.current_speed,
            'right_speed': self.right_motor.current_speed
        }


# Demo: Drive in a square
robot = DifferentialDrive()
print("=== Differential Drive Demo ===\n")

# Simulate driving
commands = [
    ("Forward", 0.2, 0),      # Move forward
    ("Turn left", 0, 0.5),    # Rotate
    ("Forward", 0.2, 0),      # Move forward
    ("Turn left", 0, 0.5),    # Rotate
]

for name, linear, angular in commands:
    print(f"Command: {name}")
    robot.set_velocity(linear, angular)

    # Simulate for 2 seconds
    for _ in range(20):
        robot.update(0.1)

    pose = robot.get_pose()
    print(f"  Position: ({pose['x']:.2f}, {pose['y']:.2f})")
    print(f"  Heading: {pose['theta']:.1f}°")
    print()
```

---

## Pillar 4: Learning

**Learning** is how a Physical AI system improves over time. It answers: "How can I do better?"

### Types of Learning in Physical AI

| Learning Type | How It Works | Example |
|---------------|--------------|---------|
| **Supervised** | Learn from labeled examples | Object recognition training |
| **Reinforcement** | Learn from rewards/penalties | Robot navigation in maze |
| **Imitation** | Learn from demonstrations | Learning from human examples |
| **Self-Supervised** | Learn from unlabeled data | Predicting sensor readings |

### Simple Learning Example

```python
"""
Example: Basic Q-Learning for a Simple Robot
Demonstrates how robots can learn from experience
"""

import random
from collections import defaultdict

class SimpleLearningAgent:
    """
    A robot that learns to navigate using Q-learning.

    Q-learning is a model-free reinforcement learning algorithm
    that learns the value of actions in different states.
    """

    def __init__(self, actions, learning_rate=0.1, discount=0.9, epsilon=0.1):
        self.actions = actions
        self.learning_rate = learning_rate  # How fast to learn
        self.discount = discount  # How much to value future rewards
        self.epsilon = epsilon  # Exploration rate

        # Q-table: maps (state, action) -> expected reward
        self.q_table = defaultdict(float)

        # Track learning progress
        self.episode_rewards = []

    def get_state_key(self, state):
        """Convert state to hashable key."""
        return tuple(state) if isinstance(state, list) else state

    def choose_action(self, state):
        """
        Choose an action using epsilon-greedy policy.

        With probability epsilon: explore (random action)
        Otherwise: exploit (best known action)
        """
        state_key = self.get_state_key(state)

        # Exploration: random action
        if random.random() < self.epsilon:
            return random.choice(self.actions)

        # Exploitation: best known action
        q_values = {a: self.q_table[(state_key, a)] for a in self.actions}
        max_q = max(q_values.values())

        # If multiple actions have same value, choose randomly among them
        best_actions = [a for a, q in q_values.items() if q == max_q]
        return random.choice(best_actions)

    def learn(self, state, action, reward, next_state):
        """
        Update Q-value based on experience.

        Q(s,a) = Q(s,a) + lr * (reward + discount * max(Q(s',a')) - Q(s,a))
        """
        state_key = self.get_state_key(state)
        next_state_key = self.get_state_key(next_state)

        # Current Q-value
        current_q = self.q_table[(state_key, action)]

        # Best Q-value for next state
        next_q_values = [self.q_table[(next_state_key, a)] for a in self.actions]
        max_next_q = max(next_q_values) if next_q_values else 0

        # Update rule
        new_q = current_q + self.learning_rate * (
            reward + self.discount * max_next_q - current_q
        )

        self.q_table[(state_key, action)] = new_q

    def get_learned_policy(self):
        """Return the best action for each known state."""
        states = set(key[0] for key in self.q_table.keys())
        policy = {}
        for state in states:
            q_values = {a: self.q_table[(state, a)] for a in self.actions}
            policy[state] = max(q_values, key=q_values.get)
        return policy


# Simple grid world for demonstration
class GridWorld:
    """A simple grid environment for learning."""

    def __init__(self, size=5):
        self.size = size
        self.goal = (size-1, size-1)
        self.reset()

    def reset(self):
        self.position = (0, 0)
        return self.position

    def step(self, action):
        """Take an action and return (new_state, reward, done)."""
        x, y = self.position

        if action == 'up' and y > 0:
            y -= 1
        elif action == 'down' and y < self.size - 1:
            y += 1
        elif action == 'left' and x > 0:
            x -= 1
        elif action == 'right' and x < self.size - 1:
            x += 1

        self.position = (x, y)

        # Reward structure
        if self.position == self.goal:
            return self.position, 100, True  # Big reward for goal
        else:
            return self.position, -1, False  # Small penalty for each step


# Train the agent
print("=== Q-Learning Demo ===\n")

env = GridWorld(size=5)
agent = SimpleLearningAgent(actions=['up', 'down', 'left', 'right'])

# Training loop
num_episodes = 500
for episode in range(num_episodes):
    state = env.reset()
    total_reward = 0

    for step in range(100):  # Max steps per episode
        action = agent.choose_action(state)
        next_state, reward, done = env.step(action)
        agent.learn(state, action, reward, next_state)

        total_reward += reward
        state = next_state

        if done:
            break

    if episode % 100 == 0:
        print(f"Episode {episode}: Total Reward = {total_reward}")

print("\nLearned Policy (best action per position):")
policy = agent.get_learned_policy()
for state in sorted(policy.keys()):
    print(f"  Position {state}: {policy[state]}")
```

---

## How the Pillars Work Together

In a real Physical AI system, all four pillars operate simultaneously:

```
Time ──────────────────────────────────────────────────────►

     ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
     │Sense│  │Sense│  │Sense│  │Sense│  │Sense│
     └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘
        │        │        │        │        │
        ▼        ▼        ▼        ▼        ▼
     ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
     │Think│  │Think│  │Think│  │Think│  │Think│
     └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘
        │        │        │        │        │
        ▼        ▼        ▼        ▼        ▼
     ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
     │ Act │  │ Act │  │ Act │  │ Act │  │ Act │
     └─────┘  └─────┘  └─────┘  └─────┘  └─────┘

        └───────────────┬───────────────────┘
                        │
                   ┌────▼────┐
                   │  LEARN  │ (Updates based on experience)
                   └─────────┘
```

---

## Troubleshooting

| Issue | Possible Cause | Solution |
|-------|----------------|----------|
| Robot doesn't respond to sensors | Sensor not connected/initialized | Check wiring; verify initialization code |
| Erratic movement | Sensor noise | Implement filtering; add sensor fusion |
| Robot overshoots targets | No feedback control | Implement PID control |
| Learning doesn't converge | Wrong hyperparameters | Adjust learning rate, exploration |

---

## Summary

### Key Takeaways

- ✅ **Perception** gathers environmental data through sensors (cameras, LIDAR, IMU)
- ✅ **Reasoning** processes information and makes decisions (state machines, planners)
- ✅ **Actuation** executes physical actions through motors and actuators
- ✅ **Learning** improves performance over time through experience

### Checkpoint Quiz

<div className="checkpoint-quiz">

Test your understanding:

1. What is sensor fusion and why is it important?

2. Name three types of motors and when you would use each one.

3. What is the difference between reactive and deliberative reasoning?

<details>
<summary>View Answers</summary>

1. **Sensor fusion** is combining data from multiple sensors to get more accurate or complete information. It's important because individual sensors have limitations (noise, blind spots, range), and combining them compensates for these weaknesses.

2. **Motor types:**
   - **DC Motor**: Continuous rotation, good for wheels and fans where precise position isn't needed
   - **Servo Motor**: Precise angular position control, good for robot joints and steering
   - **Stepper Motor**: Discrete steps with very high precision, good for 3D printers and CNC machines

3. **Reactive reasoning** responds directly to sensor input without planning (fast but simple). **Deliberative reasoning** plans ahead by considering future consequences (slower but handles complex scenarios). Most robots use a combination of both.

</details>

</div>

---

## Exercises

### <span className="exercise-badge exercise-badge--basic">Basic</span> Exercise 1: Sensor Comparison

Research and create a comparison table of 5 different sensors not covered in this lesson. Include: what they measure, typical applications, advantages, and limitations.

**Expected Outcome:** A detailed table comparing sensors like force sensors, flex sensors, color sensors, etc.

### <span className="exercise-badge exercise-badge--intermediate">Intermediate</span> Exercise 2: State Machine Design

Design a state machine for a robot security guard that patrols, investigates disturbances, and alerts when threats are detected. Include at least 5 states and draw the transition diagram.

**Expected Outcome:** A diagram and description of states, transitions, and triggering conditions.

---

## Further Reading

- 📄 [Introduction to Sensors in Robotics](https://www.electronicshub.org/types-of-sensors/) - Overview of sensor technologies
- 📄 [Understanding PID Control](https://www.ni.com/en-us/innovations/white-papers/06/pid-theory-explained.html) - Deep dive into control systems
- 📹 [Reinforcement Learning Course](https://www.youtube.com/playlist?list=PLqYmG7hTraZBiG_XpjnPrSNw-1XQaM_gB) - DeepMind's RL series

---

## What's Next?

In the next lesson, [Your First Physical AI System](/docs/01-foundations/lesson-03-your-first-physical-ai-system), you'll put all four pillars together and build a complete working system—a simulated robot that perceives, reasons, acts, and learns.

---

*Estimated completion time: 60 minutes*
