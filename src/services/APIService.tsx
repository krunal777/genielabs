import api from '../api'

export const getTexture = async (
  parts: string[], 
  objectName: string | undefined, 
  prompt: string, 
  creationId?: string
) => {
    let url = `/get_texture?part=${parts.join(' ')}&object_3d_name=${objectName}&prompt=${prompt}&API_KEY=${sessionStorage.getItem('API_KEY')}`;
    if (creationId) { 
        url += `&creation_id=${creationId}`;
    }
    
    const response = await api.get(url);
    return response.data;
};

export const getResult = async (creationId: string) => {
    const url = `/get_result?creation_id=${creationId}&API_KEY=${sessionStorage.getItem('API_KEY')}`;
    const response = await api.get(url);
    return response.data;
};
