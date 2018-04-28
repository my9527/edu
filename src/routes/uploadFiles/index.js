import React from 'react';

import { Upload, Button, Icon, message } from 'antd';
import { BASE_URL } from '../../utils/request';

class PageUploadFiles extends React.Component {

  render() {

    const props = {
      name: 'file',
      action: BASE_URL + '/v1/uploads',
      listType: 'picture',
      accept:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      onChange: (info) => {
        if (info.file.status === 'done') {
          message.success('上传成功');
        } else if (info.file.status === 'error'){
          message.error('上传失败，请稍后重试');
        }
      },
      defaultFileList: [],
      onPreview: ()=>{
        return false;
      },
      withCredentials: true,
    };
    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> upload files
          </Button>
        </Upload>
      </div>
    )
  }
}

export default PageUploadFiles;
