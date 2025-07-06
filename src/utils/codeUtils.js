// Helper to get language from file extension
export function getLanguageFromFileName(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
      return 'javascript';
    case 'java':
      return 'java';
    case 'py':
    case 'python':
      return 'python';
    case 'c':
      return 'c';
    case 'cpp':
    case 'cc':
    case 'cxx':
      return 'cpp';
    case 'json':
      return 'json';
    default:
      return 'plaintext';
  }
}

// Helper to get run command based on file type
export function getRunCommand(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'js':
    case 'jsx':
      return { command: 'node', args: [fileName] };
    case 'py':
    case 'python':
      return { command: 'python', args: [fileName] };
    case 'java':
      return { command: 'java', args: [fileName.replace('.java', '')] };
    case 'cpp':
    case 'cc':
    case 'cxx':
      return { command: 'g++', args: [fileName, '-o', fileName.replace('.cpp', ''), '&&', './' + fileName.replace('.cpp', '')] };
    case 'c':
      return { command: 'gcc', args: [fileName, '-o', fileName.replace('.c', ''), '&&', './' + fileName.replace('.c', '')] };
    default:
      return null;
  }
}

// Function to clean ANSI escape codes from output
export function cleanAnsiCodes(text) {
  return text
    // Remove ANSI color codes
    .replace(/\u001b\[[0-9;]*m/g, '')
    // Remove cursor positioning codes
    .replace(/\u001b\[[0-9]*[ABCD]/g, '')
    // Remove clear line codes
    .replace(/\u001b\[[0-9]*K/g, '')
    // Remove cursor movement codes
    .replace(/\u001b\[[0-9]*G/g, '')
    // Remove other common escape sequences
    .replace(/\u001b\[[0-9;]*[Hf]/g, '')
    // Remove bell character
    .replace(/\u0007/g, '')
    // Remove other control characters
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, '')
    // Remove backslashes that appear before escape sequences
    .replace(/\\\u001b/g, '')
    // Remove any remaining backslashes that might be artifacts
    .replace(/\\+/g, '')
    // Clean up multiple spaces and newlines
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

// Function to transform filetree to WebContainer format
export function toWebContainerFileTree(filetree) {
  const result = {};
  for (const [name, value] of Object.entries(filetree)) {
    if (value && typeof value.content === 'string') {
      result[name] = { file: { contents: value.content } };
    }
  }
  return result;
} 