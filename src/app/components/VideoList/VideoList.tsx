import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

interface Props {
  videos: any[];
  onVideoSelect: (v: any) => void;
}

const VideoList = ({ videos, onVideoSelect }: Props) => {
  return (
    <Menu >
          <MenuButton
              px={4}
              py={2}
              transition='all 0.2s'
              borderRadius='md'
              borderWidth='1px'
              _hover={{ bg: 'gray.400' }}
              _expanded={{ bg: 'blue.400' }}
              _focus={{ boxShadow: 'outline' }}
          >
              File
      </MenuButton>
      <MenuList>
      {videos.map((video, i) => (
        <MenuItem
          key={video.id}
          className="video-item"
          onClick={() => onVideoSelect(video)}
        >
          {/* <img src={video.thumbnail} alt={video.title} /> */}
          <h4>{`Video ${i}`}</h4>
        </MenuItem>
      ))}
    </MenuList>
    </Menu>
  );
};

export default VideoList;
