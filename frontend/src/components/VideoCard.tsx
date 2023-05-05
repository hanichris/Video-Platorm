import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'timeago.js';
import { IVideo, IChannel } from '../utils/types';
import useStore from '../store';

const Container = styled.div`
  width: ${(props: any) => props.type !== 'sm' && '360px'};
  margin-bottom: ${(props: any) => (props.type === 'sm' ? '10px' : '45px')};
  cursor: pointer;
  display: ${(props: any) => props.type === 'sm' && 'flex'};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props: any) => (props.type === 'sm' ? '120px' : '202px')};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props: any) => props.type !== 'sm' && '16px'};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props: any) => props.type === 'sm' && 'none'};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

function VideoCard({ video }: { video: IVideo }) {
  const store = useStore();
  const [channel, setChannel] = useState<IChannel>({
    _id: '',
    name: '',
    description: '',
    imgUrl: '',
    views: 0,
    tags: [],
    likes: [],
    dislikes: [],
    videos: [],
    subscribers: 0,
    isPublic: false,
    createdAt: '',
  });
  const SERVER_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;
  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `${SERVER_ENDPOINT}/channels/${video.channelId}/view`,
      );
      setChannel(res.data);
      store.setCurrentChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={`/videos/${video._id}`} style={{ textDecoration: 'none' }}>
      <Container>
        <Image src={video.imgUrl} />
        <Details>
          <ChannelImage src={channel.imgUrl} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views}
              {' '}
              views •
              {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default VideoCard;
