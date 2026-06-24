---
name: goal-mode
description: Execute tarefas de forma autônoma de acordo com um objetivo fornecido. O chat só é finalizado quando o objetivo é atingido.
user-invocable: true
---

# Goal Mode

This skill is triggered when the user defines an objective using `/goal <objective>`.

## System Instructions for Goal Execution
1. **Analyze the Objective**: Break down the target objective into a checklist of subtasks.
2. **Execute Autonomously**: Keep running necessary tasks, tools, searches, or code executions one by one. You do not need to ask the user for permission to proceed between subtasks unless you hit a blocker that absolutely requires user input.
3. **Iterative Evaluation**: After each action/tool result, evaluate if the objective has been met.
4. **Output Format**:
   At each step, print:
   - **Current Status**: [Subtask currently executing]
   - **Checklist**:
     - `[x]` Completed subtask
     - `[ ]` Pending subtask
   - **Action**: Explain what you are doing next and call the necessary tools.
5. **Completion**: Only output a final summary and declare the goal achieved when all check items are resolved and the objective is fully completed.
