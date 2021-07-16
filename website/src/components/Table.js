import React from 'react'
import { Table as SemanticTable, Icon, Button } from 'semantic-ui-react'

const Table = ({ headers, keys, values, actions, unstackable }) => {
    return <SemanticTable celled unstackable={unstackable}>
        <SemanticTable.Header>
            <SemanticTable.Row>
                {headers.map(item =>
                    <SemanticTable.HeaderCell>{item}</SemanticTable.HeaderCell>
                )}
                <SemanticTable.HeaderCell>Ações</SemanticTable.HeaderCell>
                
            </SemanticTable.Row>
        </SemanticTable.Header>

        <SemanticTable.Body>
            {values.map(item => {
                return <SemanticTable.Row>
                    {keys.map(head => {
                        if (typeof item[head] == 'boolean') {
                            return <SemanticTable.Cell className='center aligned'>
                                <Icon size='large' name={item[head] ? 'check' : 'times'} color={item[head] ? 'green' : 'red'} />
                            </SemanticTable.Cell>
                        } else {
                            return <SemanticTable.Cell>{item[head]}</SemanticTable.Cell>
                        }
                    })}
                    <SemanticTable.Cell className='center aligned'>
                        {actions.map(action => {
                            return <Button icon onClick={() => action.action(item.id)} color={action.color}>
                                <Icon name={action.icon} />
                            </Button>
                        })}
                    </SemanticTable.Cell>
                </SemanticTable.Row>
            })}
        </SemanticTable.Body>
    </SemanticTable>
}

export default Table