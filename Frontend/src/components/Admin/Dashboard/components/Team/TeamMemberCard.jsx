import React from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

import { FaSquareXTwitter ,FaGithub, FaLinkedin } from "react-icons/fa6";


const TeamMemberCard = ({ image, firstName, lastName, email, phone, role,socialLinks }) => {
  return (
    <div className="min-w-60 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
      <div className="p-2">
      <img
        className="w-28 h-28 rounded-full mx-auto object-contain mt-2"
        src={image}
        alt={`${firstName} ${lastName}`}
      />
      </div>
      <div className="p-1 text-center">
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-2">
          {firstName} {lastName}
        </h2>
        <p className="text-sm text-gray-600 mb-2">Role: {role}</p>
        <p className="text-sm text-gray-600 mb-2">{email}</p>
        <div className="flex items-center justify-center mb-2">
          <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">{phone}</span>
        </div>
        <div className="flex space-x-4 justify-center mt-2 mb-2">
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
          )}
          {socialLinks.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400"
            >
              <FaSquareXTwitter className="h-5 w-5" />
            </a>
          )}
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          )}
          {socialLinks.email && (
            <a
              href={`mailto:${socialLinks.email}`}
              className="text-gray-600 hover:text-red-500"
            >
              <EnvelopeIcon className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;