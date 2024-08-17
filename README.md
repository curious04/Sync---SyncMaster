# Version Control System

This project is a simplified version of Git, a distributed version control system. It uses SHA-1 hashing to ensure that even if two objects share the same name, their differing contents will result in unique hashes.

## Features

- **SHA-1 Hashing**: The system uses SHA-1 hashing to generate unique identifiers for files based on their contents.
- **Object Storage**: Files added to the system are stored in an object folder, with their file names generated from the hash of the file content.
- **Efficient Storage Structure**: The last 38 out of 40 hexadecimal characters of the hash are used as the file name, while the first 2 characters are used to create a subfolder, efficiently organizing the files within the object folder.

## How It Works

### 1. Hashing

The system uses the Node.js `crypto` library to generate SHA-1 hashes. Even if two files have the same name, their content differences will result in unique hashes.

### 2. Encoding

Files are encoded in `UTF-8` to ensure consistent hashing and storage.

### 3. Storage in Object Folder

When a file is added to the system using a command similar to `git add`, it is stored in the objects folder. The file name is derived from the hash of the file's content.

### 4. File Naming and Folder Structure

- **File Name**: The last 38 characters of the 40-character hash are used as the file name.
- **Folder Structure**: The first 2 characters of the hash are used to create a subfolder, organizing files based on their hash.

### Example Structure

If the SHA-1 hash of a file is `abc123...xyz789`, the file would be stored as:

objects/
ab/
c123...xyz789


## Getting Started

To get started, clone the repository and install the necessary dependencies.

```bash
git clone https://github.com/yourusername/version-control-system.git
cd version-control-system
npm install

