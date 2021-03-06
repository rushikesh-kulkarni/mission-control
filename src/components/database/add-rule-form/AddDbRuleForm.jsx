import React, { useState } from 'react';
import { Modal, Switch, Form, Input } from 'antd';
import { Controlled as CodeMirror } from 'react-codemirror2';
import FormItemLabel from "../../form-item-label/FormItemLabel"
import 'codemirror/theme/material.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/edit/closebrackets.js'
import { defaultDBRules } from '../../../constants';
import { notify } from '../../../utils';

const AddDbRuleForm = ({ form, handleSubmit, handleCancel, conformLoading, defaultRules }) => {
    const { getFieldDecorator } = form;

    const [rule, setRule] = useState(JSON.stringify(defaultRules, null, 2));

    const handleSubmitClick = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                try {
                    handleSubmit(
                        values.name,
                        JSON.parse(rule)
                    );
                } catch (ex) {
                    notify("error", "Error", ex.toString())
                }
            }
        });
    };


    return (
        <div>
            <Modal
                className='edit-item-modal'
                visible={true}
                width={520}
                okText="Add"
                title="Add rule"
                onOk={handleSubmitClick}
                confirmLoading={conformLoading}
                onCancel={handleCancel}
            >
                <Form layout="vertical" onSubmit={handleSubmitClick}>
                    <FormItemLabel name="Name" />
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please provide a name to your collection or table!' }]
                        })(
                            <Input placeholder="Example: collection-name" />
                        )}
                    </Form.Item>
                    <div>
                        <FormItemLabel name="Rule" />
                        <CodeMirror
                            value={rule}
                            options={{
                                mode: { name: "javascript", json: true },
                                lineNumbers: true,
                                styleActiveLine: true,
                                matchBrackets: true,
                                autoCloseBrackets: true,
                                tabSize: 2,
                                autofocus: false
                            }}
                            onBeforeChange={(editor, data, value) => {
                                setRule(value)
                            }}
                        />
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default Form.create({})(AddDbRuleForm);