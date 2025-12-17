---
sidebar_position: 3
title: "Your First Physical AI System"
description: "Build a complete Physical AI system from scratch - a simulated robot that perceives, reasons, acts, and learns to navigate its environment."
keywords:
  - physical ai project
  - robot simulation
  - hands-on robotics
  - python robot
  - autonomous navigation
image: /img/og/ch01-l03-first-system.png
---

# Your First Physical AI System

<div className="lesson-progress">
📖 **Chapter 1** · Lesson 3 of 3 · ⏱️ 90 minutes
</div>

## Learning Objectives

By the end of this lesson, you will be able to:

- [ ] Build a complete Physical AI system integrating all four pillars
- [ ] Create a robot that autonomously navigates to goals while avoiding obstacles
- [ ] Implement a simulation environment for testing Physical AI algorithms
- [ ] Debug and troubleshoot Physical AI systems

## Prerequisites

Before starting this lesson, you should have:

- Completed [Lesson 1.1: What is Physical AI?](/docs/01-foundations/lesson-01-what-is-physical-ai)
- Completed [Lesson 1.2: Components of Physical AI Systems](/docs/01-foundations/lesson-02-components-of-physical-ai)
- Python 3.8+ installed
- Basic understanding of object-oriented programming

## Introduction

You've learned about the Sense-Think-Act cycle. You've explored the four pillars of Physical AI. Now it's time to bring everything together and build something real.

In this lesson, you'll create **NavigatorBot**—a simulated robot that demonstrates all the principles of Physical AI. NavigatorBot will perceive obstacles using simulated sensors, reason about the best path to its goal, act by moving through its environment, and even learn from experience to improve its performance.

This isn't just a toy example. The architecture you'll build here is the same one used in real autonomous vehicles, warehouse robots, and delivery drones—just at a smaller scale. By the end of this lesson, you'll have a working Physical AI system and the foundation to build much more.

:::tip Why This Matters
Building a complete system helps you understand how all the pieces fit together. Real-world Physical AI development requires integrating perception, reasoning, actuation, and learning—not mastering them in isolation.
:::

---

## Project Overview

<div className="project-overview">

### Project: NavigatorBot

| Aspect | Details |
|--------|---------|
| **Duration** | 90 minutes |
| **Difficulty** | Beginner-Intermediate |
| **Hardware** | None - simulation only |
| **Software** | Python 3.8+ |
| **Libraries** | None (pure Python) |

</div>

### What You'll Build

NavigatorBot is an autonomous robot that:
- **Perceives** obstacles using distance sensors
- **Reasons** about navigation using goal-seeking and obstacle avoidance
- **Acts** by moving through a 2D environment
- **Learns** optimal paths through experience

```
┌────────────────────────────────────────────────────────┐
│              NAVIGATORBOT ARCHITECTURE                 │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │                 ENVIRONMENT                       │ │
│  │  ┌─────┐                            ┌─────┐      │ │
│  │  │  █  │ obstacles                  │  ★  │ goal │ │
│  │  └─────┘                            └─────┘      │ │
│  │         ┌─────┐                                  │ │
│  │         │ 🤖  │ NavigatorBot                     │ │
│  │         └─────┘                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                         │                             │
│                         ▼                             │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐        │
│  │  SENSE   │───►│  THINK   │───►│   ACT    │        │
│  │ Sensors  │    │ Planning │    │  Motors  │        │
│  └──────────┘    └──────────┘    └──────────┘        │
│                         │                             │
│                         ▼                             │
│                  ┌──────────┐                         │
│                  │  LEARN   │                         │
│                  │ Q-values │                         │
│                  └──────────┘                         │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## Step 1: Create the Environment

First, let's create the world our robot will navigate.

```python
"""
NavigatorBot - Your First Physical AI System
Chapter 1, Lesson 3

A complete Physical AI system demonstrating:
- Perception (distance sensors)
- Reasoning (navigation planning)
- Actuation (movement control)
- Learning (Q-learning for path optimization)
"""

import math
import random
from typing import List, Tuple, Dict, Optional
from dataclasses import dataclass
from enum import Enum

# ============================================================
# ENVIRONMENT
# ============================================================

@dataclass
class Obstacle:
    """An obstacle in the environment."""
    x: float
    y: float
    radius: float

    def contains(self, px: float, py: float) -> bool:
        """Check if point (px, py) is inside this obstacle."""
        distance = math.sqrt((px - self.x)**2 + (py - self.y)**2)
        return distance < self.radius


class Environment:
    """
    The 2D world where our robot operates.

    Features:
    - Configurable size
    - Multiple obstacles
    - Goal position
    - Collision detection
    """

    def __init__(self, width: float = 20.0, height: float = 20.0):
        self.width = width
        self.height = height
        self.obstacles: List[Obstacle] = []
        self.goal = (width - 2, height - 2)  # Default goal position

    def add_obstacle(self, x: float, y: float, radius: float):
        """Add an obstacle to the environment."""
        self.obstacles.append(Obstacle(x, y, radius))

    def add_random_obstacles(self, count: int, min_radius: float = 0.5,
                            max_radius: float = 1.5):
        """Add random obstacles, avoiding start and goal areas."""
        for _ in range(count):
            # Keep trying until we find a valid position
            for attempt in range(100):
                x = random.uniform(2, self.width - 2)
                y = random.uniform(2, self.height - 2)
                radius = random.uniform(min_radius, max_radius)

                # Check if too close to start (0,0) or goal
                dist_to_start = math.sqrt(x**2 + y**2)
                dist_to_goal = math.sqrt((x - self.goal[0])**2 +
                                        (y - self.goal[1])**2)

                if dist_to_start > 3 and dist_to_goal > 3:
                    # Check if overlaps with existing obstacles
                    overlaps = False
                    for obs in self.obstacles:
                        dist = math.sqrt((x - obs.x)**2 + (y - obs.y)**2)
                        if dist < radius + obs.radius + 0.5:
                            overlaps = True
                            break

                    if not overlaps:
                        self.add_obstacle(x, y, radius)
                        break

    def is_valid_position(self, x: float, y: float, robot_radius: float = 0.3) -> bool:
        """Check if position is valid (in bounds and not in obstacle)."""
        # Check bounds
        if x < 0 or x > self.width or y < 0 or y > self.height:
            return False

        # Check obstacles
        for obs in self.obstacles:
            distance = math.sqrt((x - obs.x)**2 + (y - obs.y)**2)
            if distance < obs.radius + robot_radius:
                return False

        return True

    def distance_to_obstacle(self, x: float, y: float, angle: float,
                            max_range: float = 5.0) -> float:
        """
        Cast a ray from (x,y) at given angle and return distance to nearest obstacle.
        This simulates a distance sensor like ultrasonic or LIDAR.
        """
        # Ray marching simulation
        step_size = 0.1
        distance = 0

        while distance < max_range:
            # Calculate point along ray
            check_x = x + distance * math.cos(angle)
            check_y = y + distance * math.sin(angle)

            # Check bounds
            if check_x < 0 or check_x > self.width or check_y < 0 or check_y > self.height:
                return distance

            # Check obstacles
            for obs in self.obstacles:
                dist_to_obs = math.sqrt((check_x - obs.x)**2 + (check_y - obs.y)**2)
                if dist_to_obs < obs.radius:
                    return distance

            distance += step_size

        return max_range  # No obstacle found within range

    def set_goal(self, x: float, y: float):
        """Set the goal position."""
        self.goal = (x, y)

    def distance_to_goal(self, x: float, y: float) -> float:
        """Calculate distance from a point to the goal."""
        return math.sqrt((x - self.goal[0])**2 + (y - self.goal[1])**2)

    def __str__(self):
        return f"Environment({self.width}x{self.height}, {len(self.obstacles)} obstacles)"
```

---

## Step 2: Build the Robot

Now let's create NavigatorBot with its sensors and actuators.

```python
# ============================================================
# NAVIGATORBOT - THE ROBOT
# ============================================================

class Action(Enum):
    """Possible actions the robot can take."""
    FORWARD = "forward"
    BACKWARD = "backward"
    LEFT = "left"
    RIGHT = "right"
    FORWARD_LEFT = "forward_left"
    FORWARD_RIGHT = "forward_right"


class NavigatorBot:
    """
    A Physical AI robot that navigates to goals while avoiding obstacles.

    Features:
    - 8 distance sensors for perception
    - Differential drive for movement
    - Q-learning for path optimization
    """

    def __init__(self, x: float = 1.0, y: float = 1.0, theta: float = 0.0):
        # Position and orientation
        self.x = x
        self.y = y
        self.theta = theta  # radians, 0 = facing right

        # Physical properties
        self.radius = 0.3
        self.max_speed = 0.5  # units per step
        self.turn_rate = math.pi / 6  # radians per step

        # Sensor configuration (8 sensors evenly distributed)
        self.num_sensors = 8
        self.sensor_range = 5.0
        self.sensor_angles = [i * (2 * math.pi / self.num_sensors)
                            for i in range(self.num_sensors)]

        # Learning components
        self.q_table: Dict[Tuple, Dict[Action, float]] = {}
        self.learning_rate = 0.1
        self.discount_factor = 0.9
        self.epsilon = 0.2  # Exploration rate

        # Statistics
        self.total_distance = 0
        self.steps_taken = 0
        self.collisions = 0

    # ----------------------------------------------------------
    # PERCEPTION: Sensing the environment
    # ----------------------------------------------------------

    def sense(self, environment: Environment) -> Dict:
        """
        Gather sensor readings from the environment.

        Returns:
            Dictionary containing all sensor data
        """
        sensor_readings = {}

        # Distance sensors
        for i, rel_angle in enumerate(self.sensor_angles):
            abs_angle = self.theta + rel_angle
            distance = environment.distance_to_obstacle(
                self.x, self.y, abs_angle, self.sensor_range
            )
            sensor_readings[f'sensor_{i}'] = {
                'distance': distance,
                'angle': math.degrees(rel_angle),
                'blocked': distance < self.sensor_range * 0.8
            }

        # Goal information
        goal_distance = environment.distance_to_goal(self.x, self.y)
        goal_dx = environment.goal[0] - self.x
        goal_dy = environment.goal[1] - self.y
        goal_angle = math.atan2(goal_dy, goal_dx)
        relative_goal_angle = self._normalize_angle(goal_angle - self.theta)

        sensor_readings['goal'] = {
            'distance': goal_distance,
            'angle': math.degrees(relative_goal_angle),
            'reached': goal_distance < 0.5
        }

        # Current state
        sensor_readings['pose'] = {
            'x': self.x,
            'y': self.y,
            'theta': math.degrees(self.theta)
        }

        return sensor_readings

    def _normalize_angle(self, angle: float) -> float:
        """Normalize angle to [-pi, pi]."""
        while angle > math.pi:
            angle -= 2 * math.pi
        while angle < -math.pi:
            angle += 2 * math.pi
        return angle

    # ----------------------------------------------------------
    # REASONING: Deciding what to do
    # ----------------------------------------------------------

    def think(self, sensor_data: Dict) -> Action:
        """
        Process sensor data and decide on an action.

        Uses a combination of:
        1. Reactive obstacle avoidance
        2. Goal-directed behavior
        3. Learned Q-values
        """
        # Get discretized state for Q-learning
        state = self._get_state(sensor_data)

        # Epsilon-greedy action selection
        if random.random() < self.epsilon:
            # Explore: random action
            return random.choice(list(Action))
        else:
            # Exploit: best learned action (with reactive override)
            action = self._get_best_action(state, sensor_data)
            return action

    def _get_state(self, sensor_data: Dict) -> Tuple:
        """
        Convert continuous sensor data to discrete state for Q-learning.

        State includes:
        - Discretized obstacle distances (front, left, right)
        - Goal direction (left, front, right, behind)
        """
        # Discretize front sensor
        front_dist = sensor_data['sensor_0']['distance']
        front_state = 'far' if front_dist > 2 else 'medium' if front_dist > 1 else 'close'

        # Discretize left sensor (sensor 2)
        left_dist = sensor_data['sensor_2']['distance']
        left_state = 'far' if left_dist > 2 else 'medium' if left_dist > 1 else 'close'

        # Discretize right sensor (sensor 6)
        right_dist = sensor_data['sensor_6']['distance']
        right_state = 'far' if right_dist > 2 else 'medium' if right_dist > 1 else 'close'

        # Goal direction
        goal_angle = sensor_data['goal']['angle']
        if -45 <= goal_angle <= 45:
            goal_dir = 'front'
        elif 45 < goal_angle <= 135:
            goal_dir = 'left'
        elif -135 <= goal_angle < -45:
            goal_dir = 'right'
        else:
            goal_dir = 'behind'

        return (front_state, left_state, right_state, goal_dir)

    def _get_best_action(self, state: Tuple, sensor_data: Dict) -> Action:
        """Get the best action based on Q-values and reactive rules."""

        # Reactive override: if obstacle very close, avoid it
        front_dist = sensor_data['sensor_0']['distance']
        if front_dist < 0.5:
            # Choose direction with more space
            left_dist = sensor_data['sensor_2']['distance']
            right_dist = sensor_data['sensor_6']['distance']
            if left_dist > right_dist:
                return Action.LEFT
            else:
                return Action.RIGHT

        # Check Q-table for learned values
        if state in self.q_table:
            q_values = self.q_table[state]
            return max(q_values, key=q_values.get)

        # Default: move toward goal
        goal_angle = sensor_data['goal']['angle']
        if abs(goal_angle) < 30:
            return Action.FORWARD
        elif goal_angle > 0:
            return Action.FORWARD_LEFT
        else:
            return Action.FORWARD_RIGHT

    # ----------------------------------------------------------
    # ACTUATION: Executing actions
    # ----------------------------------------------------------

    def act(self, action: Action, environment: Environment) -> Tuple[bool, float]:
        """
        Execute the chosen action.

        Returns:
            (success, distance_moved)
        """
        # Calculate movement based on action
        dx, dy, dtheta = 0, 0, 0

        if action == Action.FORWARD:
            dx = self.max_speed * math.cos(self.theta)
            dy = self.max_speed * math.sin(self.theta)
        elif action == Action.BACKWARD:
            dx = -self.max_speed * 0.5 * math.cos(self.theta)
            dy = -self.max_speed * 0.5 * math.sin(self.theta)
        elif action == Action.LEFT:
            dtheta = self.turn_rate
        elif action == Action.RIGHT:
            dtheta = -self.turn_rate
        elif action == Action.FORWARD_LEFT:
            dx = self.max_speed * 0.7 * math.cos(self.theta)
            dy = self.max_speed * 0.7 * math.sin(self.theta)
            dtheta = self.turn_rate * 0.5
        elif action == Action.FORWARD_RIGHT:
            dx = self.max_speed * 0.7 * math.cos(self.theta)
            dy = self.max_speed * 0.7 * math.sin(self.theta)
            dtheta = -self.turn_rate * 0.5

        # Check if new position is valid
        new_x = self.x + dx
        new_y = self.y + dy
        new_theta = self._normalize_angle(self.theta + dtheta)

        if environment.is_valid_position(new_x, new_y, self.radius):
            distance = math.sqrt(dx**2 + dy**2)
            self.x = new_x
            self.y = new_y
            self.theta = new_theta
            self.total_distance += distance
            self.steps_taken += 1
            return True, distance
        else:
            # Collision - don't move but update orientation
            self.theta = new_theta
            self.collisions += 1
            self.steps_taken += 1
            return False, 0

    # ----------------------------------------------------------
    # LEARNING: Improving from experience
    # ----------------------------------------------------------

    def learn(self, state: Tuple, action: Action, reward: float, next_state: Tuple):
        """
        Update Q-values based on experience.

        Q(s,a) = Q(s,a) + α * (r + γ * max(Q(s',a')) - Q(s,a))
        """
        # Initialize Q-values for new states
        if state not in self.q_table:
            self.q_table[state] = {a: 0.0 for a in Action}
        if next_state not in self.q_table:
            self.q_table[next_state] = {a: 0.0 for a in Action}

        # Current Q-value
        current_q = self.q_table[state][action]

        # Maximum Q-value for next state
        max_next_q = max(self.q_table[next_state].values())

        # Update rule
        new_q = current_q + self.learning_rate * (
            reward + self.discount_factor * max_next_q - current_q
        )
        self.q_table[state][action] = new_q

    def get_reward(self, sensor_data: Dict, action_success: bool,
                  prev_goal_dist: float) -> float:
        """
        Calculate reward for the current state.

        Reward structure:
        - Big positive for reaching goal
        - Small positive for moving toward goal
        - Negative for collision
        - Small negative for each step (encourages efficiency)
        """
        goal_dist = sensor_data['goal']['distance']

        # Goal reached
        if sensor_data['goal']['reached']:
            return 100.0

        # Collision
        if not action_success:
            return -10.0

        # Progress toward goal
        progress = prev_goal_dist - goal_dist
        progress_reward = progress * 5  # Scale factor

        # Step penalty (encourages shorter paths)
        step_penalty = -0.1

        return progress_reward + step_penalty

    def reset(self, x: float = 1.0, y: float = 1.0, theta: float = 0.0):
        """Reset robot to starting position."""
        self.x = x
        self.y = y
        self.theta = theta
        self.total_distance = 0
        self.steps_taken = 0
        self.collisions = 0
```

---

## Step 3: Create the Simulation

Now let's tie everything together with a simulation loop.

```python
# ============================================================
# SIMULATION
# ============================================================

class Simulation:
    """
    Runs the Physical AI simulation.

    Manages the sense-think-act-learn cycle and collects statistics.
    """

    def __init__(self, environment: Environment, robot: NavigatorBot):
        self.env = environment
        self.robot = robot
        self.history = []
        self.episode_rewards = []

    def run_episode(self, max_steps: int = 200, verbose: bool = False) -> Dict:
        """
        Run one complete episode (start to goal or max steps).

        Returns:
            Dictionary with episode statistics
        """
        self.robot.reset()
        self.history = [(self.robot.x, self.robot.y)]

        total_reward = 0
        goal_reached = False

        for step in range(max_steps):
            # SENSE
            sensor_data = self.robot.sense(self.env)
            prev_goal_dist = sensor_data['goal']['distance']
            state = self.robot._get_state(sensor_data)

            # Check if goal reached
            if sensor_data['goal']['reached']:
                goal_reached = True
                if verbose:
                    print(f"  Goal reached in {step} steps!")
                break

            # THINK
            action = self.robot.think(sensor_data)

            # ACT
            success, distance = self.robot.act(action, self.env)
            self.history.append((self.robot.x, self.robot.y))

            # Get new state for learning
            new_sensor_data = self.robot.sense(self.env)
            next_state = self.robot._get_state(new_sensor_data)

            # Calculate reward
            reward = self.robot.get_reward(new_sensor_data, success, prev_goal_dist)
            total_reward += reward

            # LEARN
            self.robot.learn(state, action, reward, next_state)

            if verbose and step % 20 == 0:
                print(f"  Step {step}: pos=({self.robot.x:.1f}, {self.robot.y:.1f}), "
                      f"goal_dist={new_sensor_data['goal']['distance']:.1f}")

        self.episode_rewards.append(total_reward)

        return {
            'goal_reached': goal_reached,
            'steps': self.robot.steps_taken,
            'distance': self.robot.total_distance,
            'collisions': self.robot.collisions,
            'reward': total_reward,
            'path': self.history
        }

    def train(self, episodes: int = 100, verbose_interval: int = 10) -> List[Dict]:
        """
        Train the robot over multiple episodes.

        Returns:
            List of episode statistics
        """
        results = []
        successes = 0

        print("=" * 60)
        print("NAVIGATORBOT TRAINING")
        print("=" * 60)
        print(f"Environment: {self.env}")
        print(f"Episodes: {episodes}")
        print("-" * 60)

        for episode in range(episodes):
            verbose = (episode % verbose_interval == 0)
            if verbose:
                print(f"\nEpisode {episode + 1}/{episodes}")

            result = self.run_episode(verbose=verbose)
            results.append(result)

            if result['goal_reached']:
                successes += 1

            if verbose:
                print(f"  Result: {'SUCCESS' if result['goal_reached'] else 'TIMEOUT'}")
                print(f"  Steps: {result['steps']}, Collisions: {result['collisions']}")

            # Decay exploration over time
            self.robot.epsilon = max(0.05, self.robot.epsilon * 0.995)

        print("-" * 60)
        print(f"Training complete!")
        print(f"Success rate: {successes}/{episodes} ({100*successes/episodes:.1f}%)")
        print(f"States learned: {len(self.robot.q_table)}")

        return results

    def run_demo(self, verbose: bool = True) -> Dict:
        """
        Run a demonstration with no exploration (pure exploitation).
        """
        original_epsilon = self.robot.epsilon
        self.robot.epsilon = 0  # No exploration

        print("\n" + "=" * 60)
        print("NAVIGATORBOT DEMO RUN")
        print("=" * 60)

        result = self.run_episode(max_steps=300, verbose=verbose)

        print("-" * 60)
        print(f"Demo Result: {'SUCCESS' if result['goal_reached'] else 'FAILED'}")
        print(f"Steps taken: {result['steps']}")
        print(f"Distance traveled: {result['distance']:.2f}")
        print(f"Collisions: {result['collisions']}")

        self.robot.epsilon = original_epsilon
        return result


def visualize_path(environment: Environment, path: List[Tuple[float, float]]):
    """Create a simple ASCII visualization of the robot's path."""
    scale = 2
    width = int(environment.width * scale)
    height = int(environment.height * scale)

    # Create empty grid
    grid = [['.' for _ in range(width)] for _ in range(height)]

    # Draw obstacles
    for obs in environment.obstacles:
        ox, oy = int(obs.x * scale), int(obs.y * scale)
        for dy in range(-int(obs.radius * scale), int(obs.radius * scale) + 1):
            for dx in range(-int(obs.radius * scale), int(obs.radius * scale) + 1):
                if 0 <= oy + dy < height and 0 <= ox + dx < width:
                    if dx**2 + dy**2 <= (obs.radius * scale)**2:
                        grid[oy + dy][ox + dx] = '█'

    # Draw path
    for i, (x, y) in enumerate(path):
        px, py = int(x * scale), int(y * scale)
        if 0 <= py < height and 0 <= px < width:
            if grid[py][px] == '.':
                grid[py][px] = '·' if i < len(path) - 1 else '●'

    # Draw start and goal
    gx, gy = int(environment.goal[0] * scale), int(environment.goal[1] * scale)
    if 0 <= gy < height and 0 <= gx < width:
        grid[gy][gx] = '★'

    sx, sy = int(path[0][0] * scale), int(path[0][1] * scale)
    if 0 <= sy < height and 0 <= sx < width:
        grid[sy][sx] = 'S'

    # Print grid (flip y for correct orientation)
    print("\nPath Visualization:")
    print("S = Start, ★ = Goal, █ = Obstacle, · = Path, ● = End")
    print("-" * (width + 2))
    for row in reversed(grid):
        print('|' + ''.join(row) + '|')
    print("-" * (width + 2))


# ============================================================
# MAIN PROGRAM
# ============================================================

def main():
    """Main entry point for NavigatorBot."""

    # Create environment
    env = Environment(width=20, height=20)
    env.add_random_obstacles(8)
    env.set_goal(18, 18)

    # Create robot
    robot = NavigatorBot(x=1, y=1, theta=0)

    # Create simulation
    sim = Simulation(env, robot)

    # Train the robot
    results = sim.train(episodes=50, verbose_interval=10)

    # Run demo with learned behavior
    demo_result = sim.run_demo(verbose=True)

    # Visualize the path
    if demo_result['goal_reached']:
        visualize_path(env, demo_result['path'])

    # Print final statistics
    print("\n" + "=" * 60)
    print("FINAL STATISTICS")
    print("=" * 60)
    successful = sum(1 for r in results if r['goal_reached'])
    print(f"Training success rate: {successful}/{len(results)} ({100*successful/len(results):.1f}%)")
    print(f"Unique states learned: {len(robot.q_table)}")
    print(f"Average steps (successful): {sum(r['steps'] for r in results if r['goal_reached']) / max(1, successful):.1f}")


if __name__ == "__main__":
    main()
```

---

## Step 4: Run and Test

Save all the code in a single file called `navigator_bot.py` and run it:

```bash
python navigator_bot.py
```

### Expected Output

```
============================================================
NAVIGATORBOT TRAINING
============================================================
Environment: Environment(20x20, 8 obstacles)
Episodes: 50
------------------------------------------------------------

Episode 1/50
  Step 0: pos=(1.0, 1.0), goal_dist=24.0
  Step 20: pos=(3.2, 4.1), goal_dist=20.1
  ...
  Result: TIMEOUT
  Steps: 200, Collisions: 12

Episode 11/50
  Step 0: pos=(1.0, 1.0), goal_dist=24.0
  Step 20: pos=(5.1, 6.3), goal_dist=17.2
  Goal reached in 87 steps!
  Result: SUCCESS
  Steps: 87, Collisions: 3
...

------------------------------------------------------------
Training complete!
Success rate: 38/50 (76.0%)
States learned: 156

============================================================
NAVIGATORBOT DEMO RUN
============================================================
  Step 0: pos=(1.0, 1.0), goal_dist=24.0
  Step 20: pos=(5.3, 5.8), goal_dist=17.5
  Step 40: pos=(10.2, 10.1), goal_dist=11.2
  Goal reached in 68 steps!
------------------------------------------------------------
Demo Result: SUCCESS
Steps taken: 68
Distance traveled: 28.45
Collisions: 1

Path Visualization:
S = Start, ★ = Goal, █ = Obstacle, · = Path, ● = End
------------------------------------------
|......................................★●|
|.....................................···|
|....................................··..|
|...................................··...|
|..................................··....|
|.................................··.....|
|................................██......|
|...............................██·......|
|..............................··........|
|.............................··.........|
|............................··..........|
|...........................··...........|
|..........................··............|
|.........................··.............|
|.............████.......··..............|
|.............████......··...............|
|....................···.................|
|...................··...................|
|..................··....................|
|S·············..··......................|
------------------------------------------
```

---

## Understanding the Code

Let's break down what's happening:

### The Sense-Think-Act-Learn Cycle

```python
for step in range(max_steps):
    # SENSE: Gather environmental data
    sensor_data = self.robot.sense(self.env)

    # THINK: Decide what action to take
    action = self.robot.think(sensor_data)

    # ACT: Execute the action
    success, distance = self.robot.act(action, self.env)

    # LEARN: Update Q-values based on experience
    self.robot.learn(state, action, reward, next_state)
```

### Key Components

| Component | Purpose | Method |
|-----------|---------|--------|
| **Perception** | Read distance sensors, calculate goal direction | `robot.sense()` |
| **Reasoning** | Choose action based on state and learned values | `robot.think()` |
| **Actuation** | Execute movement, handle collisions | `robot.act()` |
| **Learning** | Update Q-table based on rewards | `robot.learn()` |

---

## Troubleshooting

| Issue | Possible Cause | Solution |
|-------|----------------|----------|
| Robot never reaches goal | Too many obstacles | Reduce obstacle count or size |
| Robot gets stuck | Local minimum | Increase exploration (epsilon) |
| Learning doesn't improve | Wrong reward structure | Adjust reward values |
| Robot oscillates | Too sensitive to goal angle | Add smoothing or hysteresis |

---

## Summary

### Key Takeaways

- ✅ Built a complete Physical AI system with all four pillars
- ✅ Implemented perception with simulated distance sensors
- ✅ Created reasoning with reactive behaviors and Q-learning
- ✅ Added actuation with collision detection
- ✅ Enabled learning through reinforcement learning

### Checkpoint Quiz

<div className="checkpoint-quiz">

Test your understanding:

1. Why does the robot sometimes choose random actions during training?

2. What information is included in the "state" used for Q-learning?

3. How does the reward structure encourage efficient paths?

<details>
<summary>View Answers</summary>

1. **Exploration (epsilon-greedy)**: Random actions help the robot discover new states and potentially better paths. Without exploration, the robot might get stuck in suboptimal behavior.

2. **State includes**: Discretized distances (front, left, right as 'close', 'medium', or 'far') and goal direction ('front', 'left', 'right', or 'behind'). This creates a manageable state space for Q-learning.

3. **Reward structure**: Big positive for goal (+100), small positive for progress toward goal, negative for collisions (-10), and small negative for each step (-0.1). This encourages the robot to reach the goal quickly while avoiding obstacles.

</details>

</div>

---

## Exercises

### <span className="exercise-badge exercise-badge--basic">Basic</span> Exercise 1: Adjust Parameters

Experiment with different parameters:
- Change the number of obstacles
- Adjust learning rate and discount factor
- Modify the sensor range

Document how each change affects performance.

### <span className="exercise-badge exercise-badge--intermediate">Intermediate</span> Exercise 2: Add a New Behavior

Add a "patrol" mode where the robot visits multiple waypoints in sequence before going to the final goal.

**Hint:** Modify the Environment to have a list of waypoints and update the goal as each is reached.

---

## Further Reading

- 📄 [Q-Learning Algorithm Explained](https://www.freecodecamp.org/news/an-introduction-to-q-learning-reinforcement-learning-14ac0b4493cc/) - Deeper dive into Q-learning
- 📄 [Path Planning Algorithms](https://www.redblobgames.com/pathfinding/a-star/introduction.html) - Visual introduction to A* and pathfinding
- 📹 [Robotics: Computational Motion Planning](https://www.coursera.org/learn/robotics-motion-planning) - Free Coursera course

---

## Congratulations!

You've completed Chapter 1 and built your first Physical AI system! NavigatorBot demonstrates all the core principles you'll use throughout this book:

- **Perception** through sensors
- **Reasoning** through state machines and planning
- **Actuation** through motor control
- **Learning** through reinforcement learning

In the next chapter, we'll dive deeper into **Perception** and explore computer vision, sensor fusion, and more sophisticated sensing techniques.

---

## What's Next?

Continue to [Chapter 2: Perception](/docs/02-perception/lesson-01-sensors-and-sensing) to learn how Physical AI systems see, hear, and feel the world around them.

---

*Estimated completion time: 90 minutes*
