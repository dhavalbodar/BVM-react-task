import React from 'react';
import CandidateCard from './CandidateCard';

interface CandidateProfile {
  id: string;
  profileImage: File | string | null;
  name: string;
  phoneNumber: string;
  description: string;
}

interface ProfileListProps {
  profiles: CandidateProfile[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CandidateList: React.FC<ProfileListProps> = ({ profiles, onEdit, onDelete }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap:"2px"
    }}>
      {profiles.map((profile) => (
        <CandidateCard
          key={profile.id}
          profileImage={profile.profileImage}
          name={profile.name}
          phoneNumber={profile.phoneNumber}
          description={profile.description}
          onEdit={() => onEdit(profile.id)}
          onDelete={() => onDelete(profile.id)}
        />
      ))}
    </div>
  );
};

export default React.memo(CandidateList);
