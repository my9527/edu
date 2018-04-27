import React from 'react';

import { Upload, Button, Icon, message } from 'antd';

class PageUploadFiles extends React.Component {

  render() {

    const props = {
      name: 'file',
      action: '/v1/uploads',
      listType: 'picture',
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
