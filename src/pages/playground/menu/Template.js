import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import templateState from '../../../atoms/templateState';
import Dropdown from '../../../components/DropDown'
import templates from '../../../util/templates';

export default function Template() {
  const template = useRecoilValue(templateState);
  const setTemplate = useSetRecoilState(templateState);

  const onTemplateChange = (template) => {
    setTemplate(template)
  }

  return <Dropdown
    title={template}
    data={Object.keys(templates)}
    onchange={onTemplateChange}
  />

}
