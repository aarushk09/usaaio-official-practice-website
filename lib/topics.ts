interface Prerequisite {
  title: string
  slug: string
}

interface TopicHeading {
  id: string
  text: string
  level: number
}

export interface Topic {
  slug: string
  title: string
  description: string
  frequency: "Very Frequent" | "Somewhat Frequent" | "Not Frequent"
  authors: string[]
  prerequisites: Prerequisite[]
  content: string
  headings: TopicHeading[]
  category: string
}

interface TopicCategory {
  title: string
  topics: {
    title: string
    slug: string
  }[]
}

// Sample topics data
const topics: Topic[] = [
  {
    slug: "what-is-usaaio",
    title: "What is USAAIO",
    description: "An introduction to the USA Artificial Intelligence Olympiad.",
    frequency: "Very Frequent",
    authors: ["USAAIO Team", "John Smith", "Jane Doe"],
    prerequisites: [],
    category: "Introduction to AI",
    headings: [
      { id: "what-is-usaaio", text: "What is USAAIO", level: 1 },
      { id: "competition-overview", text: "Competition Overview", level: 2 },
      { id: "eligibility", text: "Eligibility", level: 2 },
      { id: "competition-format", text: "Competition Format", level: 2 },
      { id: "syllabus", text: "Syllabus", level: 2 },
      { id: "preparation-resources", text: "Preparation Resources", level: 2 },
    ],
    content: `# What is USAAIO

The USA Artificial Intelligence Olympiad (USAAIO) is a premier competition designed to identify and nurture talented high school students in the field of artificial intelligence. The competition tests participants on both theoretical knowledge and practical implementation of AI concepts.

## Competition Overview

USAAIO was established to promote interest in artificial intelligence among high school students and to identify talented individuals who may represent the USA in the International Olympiad in Artificial Intelligence (IOAI). The competition covers a wide range of topics in AI and machine learning, from fundamental concepts to advanced techniques.

## Eligibility

To participate in USAAIO, you must:

- Be enrolled in a high school or equivalent educational institution
- Be a U.S. citizen or permanent resident
- Be under 20 years of age on the day of the international competition (for those who qualify)

## Competition Format

The USAAIO consists of multiple rounds:

1. **Qualifying Round**: An online exam testing basic knowledge of AI concepts and programming skills.
2. **National Round**: A more challenging exam for those who qualify from the first round, testing deeper understanding and implementation skills.
3. **Training Camp**: Top performers from the National Round are invited to a training camp where they receive advanced instruction and compete for spots on the international team.
4. **International Competition**: The selected team represents the USA at the International Olympiad in Artificial Intelligence.

## Syllabus

The USAAIO syllabus covers the following main areas:

- Programming Fundamentals (Python, NumPy, PyTorch)
- Classical Machine Learning (Supervised and Unsupervised Learning)
- Neural Networks and Deep Learning
- Evaluation Metrics and Model Selection
- AI Ethics and Responsible AI

For a detailed breakdown of topics, please refer to the official syllabus document.

## Preparation Resources

To prepare for USAAIO, we recommend:

- Completing the tutorials in this guide
- Solving practice problems from previous competitions
- Taking online courses in machine learning and AI
- Participating in AI-related projects and competitions

Remember that success in USAAIO requires both theoretical knowledge and practical implementation skills. Make sure to practice coding solutions to AI problems regularly.`,
  },
  {
    slug: "linear-regression",
    title: "Linear Regression",
    description: "Modeling relationships between variables using linear equations.",
    frequency: "Very Frequent",
    authors: ["Jane Smith", "John Doe", "Alex Johnson"],
    prerequisites: [
      { title: "Python Basics", slug: "python-basics" },
      { title: "NumPy and Pandas", slug: "numpy-and-pandas" },
    ],
    category: "Supervised Learning",
    headings: [
      { id: "linear-regression", text: "Linear Regression", level: 1 },
      { id: "mathematical-formulation", text: "Mathematical Formulation", level: 2 },
      { id: "implementation", text: "Implementation", level: 2 },
      { id: "cost-function", text: "Cost Function", level: 2 },
      { id: "gradient-descent", text: "Gradient Descent", level: 2 },
      { id: "evaluation-metrics", text: "Evaluation Metrics", level: 2 },
      { id: "example-problems", text: "Example Problems", level: 2 },
    ],
    content: `# Linear Regression

Linear regression is a linear approach to modeling the relationship between a dependent variable and one or more independent variables. The case of one independent variable is called simple linear regression; for more than one, it is called multiple linear regression.

## Mathematical Formulation

In simple linear regression, the relationship between the dependent variable y and the independent variable x is modeled as:

$$y = β₀ + β₁x + ε$$

where:
- β₀ is the y-intercept
- β₁ is the slope
- ε is the error term

For multiple linear regression with p features, the model is:

$$y = β₀ + β₁x₁ + β₂x₂ + ... + βₚxₚ + ε$$

## Implementation

Here's how to implement linear regression in different programming languages:

:::
== Python
\`\`\`python
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Sample data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 5, 4, 5])

# Create and fit the model
model = LinearRegression()
model.fit(X, y)

# Print coefficients
print(f"Intercept: {model.intercept_}")
print(f"Slope: {model.coef_[0]}")

# Make predictions
predictions = model.predict(X)
mse = mean_squared_error(y, predictions)
print(f"Mean Squared Error: {mse}")
\`\`\`

== Java
\`\`\`java
import org.apache.commons.math3.stat.regression.SimpleRegression;

public class LinearRegressionExample {
    public static void main(String[] args) {
        // Create the regression model
        SimpleRegression regression = new SimpleRegression();
        
        // Add data points (x,y)
        regression.addData(1, 2);
        regression.addData(2, 4);
        regression.addData(3, 5);
        regression.addData(4, 4);
        regression.addData(5, 5);
        
        // Get results
        System.out.println("Slope: " + regression.getSlope());
        System.out.println("Intercept: " + regression.getIntercept());
        System.out.println("R-squared: " + regression.getRSquare());
    }
}
\`\`\`
:::

## Cost Function

The most common cost function for linear regression is the Mean Squared Error (MSE):

$$MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$$

where:
- n is the number of samples
- y_i is the actual value
- ŷ_i is the predicted value

## Gradient Descent

Gradient descent is an optimization algorithm used to minimize the cost function by iteratively moving toward the steepest descent as defined by the negative of the gradient.

For linear regression, the update rules are:

$$β₀ = β₀ - α \cdot \frac{1}{n} \sum_{i=1}^{n} (\hat{y}_i - y_i)$$
$$β₁ = β₁ - α \cdot \frac{1}{n} \sum_{i=1}^{n} ((\hat{y}_i - y_i) \cdot x_i)$$

where α is the learning rate.

## Evaluation Metrics

Common metrics to evaluate linear regression models include:

- Mean Squared Error (MSE)
- Root Mean Squared Error (RMSE)
- Mean Absolute Error (MAE)
- R-squared (coefficient of determination)
- Adjusted R-squared

## Example Problems

### Problem 1: House Price Prediction

Given features like square footage, number of bedrooms, and location, predict the price of houses.

### Problem 2: Sales Forecasting

Predict future sales based on historical data and other relevant features like seasonality, promotions, and economic indicators.

### Problem 3: Temperature Prediction

Predict temperature based on factors like humidity, wind speed, and atmospheric pressure.`,
  },
  {
    slug: "python-basics",
    title: "Python Basics",
    description: "Loops, Functions, and other Python fundamentals.",
    frequency: "Very Frequent",
    authors: ["Alex Johnson", "Sarah Williams"],
    prerequisites: [],
    category: "Programming Fundamentals",
    headings: [
      { id: "python-basics", text: "Python Basics", level: 1 },
      { id: "variables-and-data-types", text: "Variables and Data Types", level: 2 },
      { id: "control-structures", text: "Control Structures", level: 2 },
      { id: "functions", text: "Functions", level: 2 },
      { id: "data-structures", text: "Data Structures", level: 2 },
      { id: "file-handling", text: "File Handling", level: 2 },
      { id: "common-libraries", text: "Common Libraries", level: 2 },
    ],
    content: `# Python Basics

Python is a high-level, interpreted programming language known for its readability and simplicity. It's widely used in AI and machine learning due to its extensive libraries and ease of use.

## Variables and Data Types

Python has several built-in data types:

- **Numeric Types**: int, float, complex
- **Sequence Types**: list, tuple, range
- **Text Type**: str
- **Mapping Type**: dict
- **Set Types**: set, frozenset
- **Boolean Type**: bool
- **Binary Types**: bytes, bytearray, memoryview

Example:

\`\`\`python
# Integer
x = 10

# Float
y = 3.14

# String
name = "USAAIO"

# Boolean
is_valid = True

# List
numbers = [1, 2, 3, 4, 5]

# Dictionary
person = {
    "name": "John",
    "age": 17,
    "is_student": True
}
\`\`\`

## Control Structures

### Conditional Statements

\`\`\`python
x = 10

if x > 0:
    print("Positive")
elif x < 0:
    print("Negative")
else:
    print("Zero")
\`\`\`

### Loops

\`\`\`python
# For loop
for i in range(5):
    print(i)

# While loop
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## Functions

Functions in Python are defined using the \`def\` keyword:

\`\`\`python
def greet(name):
    """This function greets the person passed in as a parameter"""
    return f"Hello, {name}!"

# Functionn call
message = greet("USAAIO")
print(message)  # Output: Hello, USAAIO!
\`\`\`

### Lambda Functions

\`\`\`python
# Regular function
def square(x):
    return x * x

# Equivalent lambda function
square_lambda = lambda x: x * x

print(square(5))       # Output: 25
print(square_lambda(5))  # Output: 25
\`\`\`

## Data Structures

### Lists

\`\`\`python
# Creating a list
fruits = ["apple", "banana", "cherry"]

# Accessing elements
print(fruits[0])  # Output: apple

# Adding elements
fruits.append("orange")

# Iterating through a list
for fruit in fruits:
    print(fruit)
\`\`\`

### Dictionaries

\`\`\`python
# Creating a dictionary
student = {
    "name": "John",
    "age": 17,
    "courses": ["Math", "Physics", "Computer Science"]
}

# Accessing elements
print(student["name"])  # Output: John

# Adding or modifying elements
student["grade"] = "A"

# Iterating through a dictionary
for key, value in student.items():
    print(f"{key}: {value}")
\`\`\`

## File Handling

\`\`\`python
# Writing to a file
with open("example.txt", "w") as file:
    file.write("Hello, USAAIO!")

# Reading from a file
with open("example.txt", "r") as file:
    content = file.read()
    print(content)  # Output: Hello, USAAIO!
\`\`\`

## Common Libraries

For AI and machine learning, you should be familiar with these libraries:

- **NumPy**: For numerical computations
- **Pandas**: For data manipulation and analysis
- **Matplotlib** and **Seaborn**: For data visualization
- **Scikit-learn**: For machine learning algorithms
- **PyTorch**: For deep learning

Example using NumPy:

\`\`\`python
import numpy as np

# Create an array
arr = np.array([1, 2, 3, 4, 5])

# Perform operations
print(arr.mean())  # Output: 3.0
print(arr.std())   # Output: 1.4142135623730951
print(arr * 2)     # Output: [2 4 6 8 10]
\`\`\`

These basics will help you get started with Python for AI and machine learning. As you progress through the USAAIO guide, you'll learn more advanced concepts and techniques.`,
  },
]

// Get all topic categories
export function getAllTopicCategories(): TopicCategory[] {
  const categories = {}

  topics.forEach((topic) => {
    if (!categories[topic.category]) {
      categories[topic.category] = []
    }

    categories[topic.category].push({
      title: topic.title,
      slug: topic.slug,
    })
  })

  return Object.keys(categories).map((category) => ({
    title: category,
    topics: categories[category],
  }))
}

// Get topic data by slug
export function getTopicData(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug)
}

// Get related topics
export function getRelatedTopics(slug: string, limit = 3): Topic[] {
  const currentTopic = topics.find((topic) => topic.slug === slug)

  if (!currentTopic) {
    return []
  }

  return topics.filter((topic) => topic.slug !== slug && topic.category === currentTopic.category).slice(0, limit)
}
