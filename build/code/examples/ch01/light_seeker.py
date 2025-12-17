"""
Physical AI - Lesson 1.1: Light-Seeking Agent
A simple demonstration of the Sense-Think-Act cycle.

This simulation creates a virtual robot that seeks light sources,
demonstrating the fundamental principles of Physical AI.

Author: Physical AI Book
Chapter: 1 - Foundations of Physical AI
Lesson: 1.1 - What is Physical AI?

Usage:
    python light_seeker.py

Requirements:
    - Python 3.8+
    - No external dependencies (uses only standard library)
"""

import math
import random


class Environment:
    """
    A simple 2D environment with a light source.

    The environment is a 100x100 grid where light intensity
    decreases with distance from the light source.

    Attributes:
        width: The width of the environment grid
        height: The height of the environment grid
        light_x: X coordinate of the light source
        light_y: Y coordinate of the light source
    """

    def __init__(self, width=100, height=100):
        """
        Initialize the environment with a random light source position.

        Args:
            width: Width of the environment (default: 100)
            height: Height of the environment (default: 100)
        """
        self.width = width
        self.height = height
        # Place light source at a random position (not too close to edges)
        self.light_x = random.randint(20, width - 20)
        self.light_y = random.randint(20, height - 20)
        print(f"Light source placed at ({self.light_x}, {self.light_y})")

    def get_light_intensity(self, x, y):
        """
        Calculate light intensity at a given position.

        Light intensity follows inverse square law:
        intensity = 1 / (1 + distance^2 / 1000)

        This formula ensures:
        - Maximum intensity of 1.0 at the light source
        - Gradual decrease with distance
        - Never reaches exactly 0

        Args:
            x: X coordinate to measure
            y: Y coordinate to measure

        Returns:
            float: Light intensity between 0 (dark) and 1 (brightest)
        """
        distance = math.sqrt((x - self.light_x)**2 + (y - self.light_y)**2)
        intensity = 1 / (1 + (distance ** 2) / 1000)
        return intensity

    def is_within_bounds(self, x, y):
        """
        Check if a position is within the environment bounds.

        Args:
            x: X coordinate to check
            y: Y coordinate to check

        Returns:
            bool: True if position is valid, False otherwise
        """
        return 0 <= x < self.width and 0 <= y < self.height


class LightSeekingAgent:
    """
    A simple Physical AI agent that seeks light sources.

    This agent demonstrates the Sense-Think-Act cycle:
    - SENSE: Measure light intensity at current position
    - THINK: Decide which direction has more light
    - ACT: Move toward the brighter area

    This behavior is called "phototaxis" and is seen in many
    biological organisms, from bacteria to insects.

    Attributes:
        x: Current X position
        y: Current Y position
        environment: Reference to the Environment object
        history: List of all positions visited
    """

    def __init__(self, x, y, environment):
        """
        Initialize the agent at a starting position.

        Args:
            x: Starting X coordinate
            y: Starting Y coordinate
            environment: The Environment object to operate in
        """
        self.x = x
        self.y = y
        self.environment = environment
        self.history = [(x, y)]  # Track movement history

    def sense(self):
        """
        SENSE: Gather information about the environment.

        Our simple robot has light sensors pointing in 4 directions.
        Each sensor measures light intensity slightly ahead in that direction.

        In a real robot, these might be photodiodes or phototransistors
        mounted on the robot body pointing in different directions.

        Returns:
            dict: Light intensity readings for each direction
        """
        sensor_distance = 5  # How far ahead each sensor looks

        readings = {
            'north': self.environment.get_light_intensity(
                self.x, self.y - sensor_distance
            ),
            'south': self.environment.get_light_intensity(
                self.x, self.y + sensor_distance
            ),
            'east': self.environment.get_light_intensity(
                self.x + sensor_distance, self.y
            ),
            'west': self.environment.get_light_intensity(
                self.x - sensor_distance, self.y
            ),
        }

        return readings

    def think(self, sensor_readings):
        """
        THINK: Process sensor data and decide on an action.

        Strategy: Move toward the direction with highest light intensity.
        This is a simple "greedy" algorithm - always chase the brightest spot.

        More sophisticated algorithms might:
        - Consider momentum (don't change direction too quickly)
        - Average readings over time (reduce noise)
        - Explore occasionally (avoid local maxima)

        Args:
            sensor_readings: Dictionary of direction -> light intensity

        Returns:
            tuple: (movement_delta, direction_name)
        """
        # Find the direction with maximum light
        best_direction = max(sensor_readings, key=sensor_readings.get)

        # Map direction names to movement vectors (dx, dy)
        movement_map = {
            'north': (0, -1),   # Y decreases going north
            'south': (0, 1),    # Y increases going south
            'east': (1, 0),     # X increases going east
            'west': (-1, 0),    # X decreases going west
        }

        return movement_map[best_direction], best_direction

    def act(self, movement):
        """
        ACT: Execute the decided movement.

        Move the robot by the specified delta, if within bounds.
        In a real robot, this would involve sending commands to
        motors or other actuators.

        Args:
            movement: Tuple of (dx, dy) movement delta

        Returns:
            bool: True if movement was successful, False if blocked
        """
        dx, dy = movement
        new_x = self.x + dx
        new_y = self.y + dy

        # Only move if within environment bounds
        if self.environment.is_within_bounds(new_x, new_y):
            self.x = new_x
            self.y = new_y
            self.history.append((self.x, self.y))
            return True
        return False

    def run_cycle(self):
        """
        Execute one complete Sense-Think-Act cycle.

        This is the core loop that drives all Physical AI systems.
        Each cycle:
        1. Gathers sensor data (SENSE)
        2. Makes a decision (THINK)
        3. Takes action (ACT)

        Returns:
            dict: Information about what happened in this cycle
        """
        # SENSE: Gather environmental data
        readings = self.sense()
        current_light = self.environment.get_light_intensity(self.x, self.y)

        # THINK: Make a decision
        movement, direction = self.think(readings)

        # ACT: Execute the decision
        moved = self.act(movement)

        return {
            'position': (self.x, self.y),
            'light_level': current_light,
            'direction': direction,
            'moved': moved,
            'readings': readings
        }

    def distance_to_light(self):
        """
        Calculate current distance to the light source.

        Returns:
            float: Euclidean distance to light source
        """
        return math.sqrt(
            (self.x - self.environment.light_x)**2 +
            (self.y - self.environment.light_y)**2
        )


def run_simulation(num_steps=100, verbose=True):
    """
    Run the light-seeking simulation.

    Creates an environment with a light source and an agent,
    then runs the Sense-Think-Act cycle for the specified number of steps.

    Args:
        num_steps: Number of Sense-Think-Act cycles to run
        verbose: If True, print detailed progress

    Returns:
        LightSeekingAgent: The agent after simulation completes
    """
    if verbose:
        print("=" * 60)
        print("PHYSICAL AI SIMULATION: Light-Seeking Agent")
        print("=" * 60)
        print()

    # Create environment with light source
    env = Environment(width=100, height=100)

    # Create agent at a random starting position
    start_x = random.randint(10, 90)
    start_y = random.randint(10, 90)
    agent = LightSeekingAgent(start_x, start_y, env)

    initial_distance = agent.distance_to_light()

    if verbose:
        print(f"Agent starting at ({start_x}, {start_y})")
        print(f"Initial distance to light: {initial_distance:.2f}")
        print()
        print("Running Sense-Think-Act cycles...")
        print("-" * 60)

    # Run simulation for specified number of steps
    for step in range(num_steps):
        result = agent.run_cycle()

        # Print progress at intervals
        if verbose and (step % 10 == 0 or step == num_steps - 1):
            print(f"Step {step:3d}: Position {result['position']}, "
                  f"Light: {result['light_level']:.4f}, "
                  f"Moving: {result['direction']}")

        # Early termination if very close to light
        if agent.distance_to_light() < 2:
            if verbose:
                print(f"Step {step:3d}: Reached the light source!")
            break

    if verbose:
        print("-" * 60)
        print()
        print("SIMULATION COMPLETE")
        print(f"Final position: ({agent.x}, {agent.y})")
        print(f"Final distance to light: {agent.distance_to_light():.2f}")
        print(f"Distance traveled: {initial_distance - agent.distance_to_light():.2f}")
        print(f"Total steps taken: {len(agent.history) - 1}")

        # Check if agent found the light
        if agent.distance_to_light() < 5:
            print("\n✓ SUCCESS! Agent reached the light source!")
        else:
            print("\n→ Agent is still approaching the light source.")

    return agent


def demo_sense_think_act():
    """
    Demonstrate a single Sense-Think-Act cycle with detailed output.

    This function shows exactly what happens in each phase of the cycle,
    making it easier to understand the core concept.
    """
    print("=" * 60)
    print("DETAILED SENSE-THINK-ACT DEMONSTRATION")
    print("=" * 60)
    print()

    # Setup
    env = Environment(width=100, height=100)
    agent = LightSeekingAgent(50, 50, env)

    print(f"Agent position: ({agent.x}, {agent.y})")
    print(f"Light position: ({env.light_x}, {env.light_y})")
    print()

    # SENSE
    print("PHASE 1: SENSE")
    print("-" * 40)
    readings = agent.sense()
    for direction, intensity in readings.items():
        print(f"  {direction:5s} sensor: {intensity:.4f}")
    print()

    # THINK
    print("PHASE 2: THINK")
    print("-" * 40)
    movement, direction = agent.think(readings)
    print(f"  Brightest direction: {direction}")
    print(f"  Decided movement: {movement}")
    print()

    # ACT
    print("PHASE 3: ACT")
    print("-" * 40)
    old_pos = (agent.x, agent.y)
    success = agent.act(movement)
    new_pos = (agent.x, agent.y)
    print(f"  Previous position: {old_pos}")
    print(f"  New position: {new_pos}")
    print(f"  Movement successful: {success}")
    print()

    print("=" * 60)
    print("One complete Sense-Think-Act cycle completed!")
    print("=" * 60)


# Main entry point
if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1 and sys.argv[1] == "--demo":
        # Run detailed demonstration
        demo_sense_think_act()
    else:
        # Run full simulation
        agent = run_simulation(num_steps=100)

        # Optional: Print movement history
        if len(sys.argv) > 1 and sys.argv[1] == "--history":
            print("\nMovement History:")
            for i, pos in enumerate(agent.history):
                print(f"  Step {i}: {pos}")
