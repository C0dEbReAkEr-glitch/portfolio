
interface CommandInfo {
  description: string;
}

export const availableCommands: Record<string, CommandInfo> = {
  "help": {
    description: "List all available commands",
  },
  "about": {
    description: "Display information about me",
  },
  "skills": {
    description: "List my technical skills",
  },
  //"experience": {
  //  description: "Show my work experience",
  //},
  "projects": {
    description: "Display my portfolio projects",
  },
  "contact": {
    description: "Show my contact information",
  },
  "clear": {
    description: "Clear the terminal screen",
  },
};

export const portfolioData = {
  name: "Khemendra Singh",
  title: "Securing Digital Environments",
  ascii: `
  _  __  _                                       _           
 | |/ / | |__    ___  _ __ ___    ___  _ __   __| | _ __  __ _ 
 | ' /  | '_ \\  / _ \\| '_ \` _ \\  / _ \\| '_ \\ / _\` || '__|/ _\` |
 | . \\  | | | ||  __/| | | | | ||  __/| | | | (_| || |  | (_| |
 |_|\\_\\ |_| |_| \\___||_| |_| |_| \\___||_| |_|\\__,_||_|   \\__,_|
                                                            
  `,
  about: `
Eager to apply theoretical knowledge in a practical environment, I am a Computer Applications graduate. I have developed a Python-based OSINT tool for gathering intelligence and automated security configurations using Bash scripting. Additionally, I built a framework for basic network security testing that identifies vulnerabilities, with a strong emphasis on system hardening. My skills include OSINT techniques and network scanning, showcasing proficiency in Linux command line and network protocols.

Location: New Delhi
`,
  skills: [
    {
      category: "Offensive Security",
      items: ["Penetration Testing", "Red Team Operations", "Vulnerability assessment", "Social Engineering", "OSINT"]
    },
    {
      category: "Defensive Security",
      items: ["Malware Analysis"]
    },
    {
      category: "Tools & Technologies",
      items: ["Kali Linux", "Metasploit", "Burp Suite", "Wireshark", "Nmap", "Gobuster", "Hydra", "Python", "Bash"]
    },
    {
      category: "Certifications",
      items: ["Linux Essentials", "Intro to Cybersecurity", "Advanced Networking", "Junior Cybersecurity Analyst", "CompTIA Security+"]
    }
  ],
  experience: [
//    {
//      title: "Senior Security Engineer",
//      company: "SecureTech Solutions",
//      period: "2022 - Present",
//      description: "Lead penetration testing engagements for Fortune 500 clients. Develop and implement security strategies to protect critical infrastructure."
//    },
//    {
//      title: "Cybersecurity Consultant",
//      company: "Cyber Defense Partners",
//      period: "2019 - 2022",
//      description: "Conducted vulnerability assessments and security audits. Provided remediation guidance and security awareness training."
//    },
//    {
//      title: "Security Analyst",
//      company: "NetGuard Security",
//      period: "2017 - 2019",
//      description: "Monitored security incidents and performed threat analysis. Developed automated security scripts for routine assessments."
//    }
  ],
  projects: [
    {
      name: "AI-Enhanced Network Scanner (NetScan)",
      description: "Develope, implemented port scanning and host discovery features a network scanner with basic anomaly detection capabilities with simple reporting for scan results.",
      tags: ["Python", "Network Programming", "Security Assessment"],
      github: "github.com/C0dEbReAkEr-glitch/NetScan"
    },
    {
      name: "OSINT Framework (OIntel)",
      description: "Developed a Python-based tool to gather intelligence from public sources, implemented data collection modules with basic reporting functionality.",
      tags: ["Web APIs", "Data Collection", "Python"],
      github: "github.com/C0dEbReAkEr-glitch/OIntel"
    },
    {
      name: "Linux System Hardening Scripts",
      description: "Developed bash scripts to automate security configurations for Ubuntu/Debian systems and implemented basic security measures for system protection including firewall rules.",
      tags: ["Bash", "Linux Security", "Configuartion Management"],
      github: "github.com/C0dEbReAkEr-glitch/Linux_security_harden"
    }
  ],
  contact: {
    email: "mail4khemendra@gmail.com",
    linkedin: "linkedin.com/in/khemendra-singh-khangarot",
    github: "github.com/C0dEbReAkEr-glitch",
    twitter: "@3FOXshield1"
  }
};
