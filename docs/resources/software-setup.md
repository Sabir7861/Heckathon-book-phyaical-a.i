---
sidebar_position: 2
title: "Software Setup"
description: "Setting up your development environment."
---

# Software Setup

Quick guide to setting up your development environment.

## Requirements

- Python 3.8 or higher
- pip package manager

## Quick Start

```bash
# Create virtual environment
python -m venv physical-ai-env

# Activate (Windows)
physical-ai-env\Scripts\activate

# Activate (macOS/Linux)
source physical-ai-env/bin/activate

# Install packages
pip install numpy opencv-python matplotlib
```

## Verify Installation

```python
import numpy as np
import cv2
print("Setup complete!")
```
