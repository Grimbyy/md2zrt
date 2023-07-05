<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">md2zrt</h3>

  <p align="center">
    Converting markdown text to the Zoom compatable Rich Text format
    <br />
    <a href="https://github.com/grimbyy/md2zrt"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
   </ol>
</details>

### Built With

[![Node][Node.js]][Node-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

```
Node.js
```

### Installation

```
npm i md2zt
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage Example
### Require:
```js
const md2zt = require('md2zt');
```

### Interpret Markdown:
```js
/** @type {[string, Array<rich_object>]} */
const [text, rich_objects] = md2zt(markdown);
// markdown: "# Hello World";
// text: 'Hello World';
/*
    rich_objects: [{
        format_type: 'Paragraph',
        format_attr: 'h1',
        start_position: 0,
        end_position: 10
    }];
/*
```

### Fire to [Zoom API](https://developers.zoom.us/docs/api/rest/reference/chat/methods/#operation/sendaChatMessage)
```js
    // Posting to /chat/users/{userId}/messages
    const request = require('your-request-lib');
    /* Make POST request*/...
    {
        /* Other request parameters*/...,
        body: {
            message: text,
            rich_text: rich_objects,
            to_channel: ...,
            ...
        },
    }
    
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/grimbyy/md2zrt.svg?style=for-the-badge
[contributors-url]: https://github.com/grimbyy/md2zrt/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/grimbyy/md2zrt.svg?style=for-the-badge
[forks-url]: https://github.com/grimbyy/md2zrt/network/members
[stars-shield]: https://img.shields.io/github/stars/grimbyy/md2zrt.svg?style=for-the-badge
[stars-url]: https://github.com/grimbyy/md2zrt/stargazers
[issues-shield]: https://img.shields.io/github/issues/grimbyy/md2zrt.svg?style=for-the-badge
[issues-url]: https://github.com/grimbyy/md2zrt/issues
[license-shield]: https://img.shields.io/github/license/grimbyy/md2zrt.svg?style=for-the-badge
[license-url]: https://github.com/grimbyy/md2zrt/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/callum-grimble
[product-screenshot]: images/screenshot.png
[Node.js]: https://img.shields.io/badge/node.js-3c873a?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/en