import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import Typography from '@material-ui/core/Typography'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { getDomainTreeView } from '../pages/api/GetDomainTreeView'

const useTreeItemStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
        '&:focus > $content': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)',
        },
    },
    content: {
        color: theme.palette.text.primary,
        borderTopRightRadius: theme.spacing(0),
        borderBottomRightRadius: theme.spacing(0),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
}))

function StyledTreeItem(props) {
    const classes = useTreeItemStyles()
    const {
        labelText,
        labelIcon: LabelIcon,
        labelInfo,
        color,
        bgColor,
        ...other
    } = props

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    {LabelIcon && LabelIcon}
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        <span className="text-gray-400">{labelInfo}</span>
                    </Typography>
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    )
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
}

const useStyles = makeStyles({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
    },
})

export default function GmailTreeView({ onClick, onClickGrade }) {
    const classes = useStyles()
    function treeItem(treeView) {
        let no = 1
        return Object.keys(treeView).map((key, value) => {
            if (key == 'totalLessons') return
            no++
            return (
                <StyledTreeItem
                    nodeId={no.toString()}
                    labelText={key}
                    labelInfo={treeView[key]['lessons']}
                    onClick={e => {
                        onClickGrade(key)
                    }}>
                    {Object.keys(treeView[key]['domain']).map((key1, value) => {
                        no++
                        return (
                            <StyledTreeItem
                                labelIcon={
                                    <img
                                        className="w-6 h-5"
                                        src={
                                            '../images/domains/' +
                                            treeView[key]['domain'][key1][
                                                'name'
                                            ] +
                                            '.png'
                                        }
                                    />
                                }
                                nodeId={no.toString()}
                                labelText={
                                    treeView[key]['domain'][key1]['name']
                                }
                                labelInfo={
                                    treeView[key]['domain'][key1]['lessons']
                                }
                                onClick={e => {
                                    onClick(key1)
                                }}
                            />
                        )
                    })}
                </StyledTreeItem>
            )
        })
    }
    const treeView = getDomainTreeView()
    return (
        <TreeView
            className={classes.root}
            defaultExpanded={['1', '2']}
            defaultSelected="3"
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}>
            {treeView && (
                <StyledTreeItem
                    nodeId="1"
                    labelText="Grades"
                    labelInfo={treeView.totalLessons}>
                    {treeItem(treeView)}
                </StyledTreeItem>
            )}
        </TreeView>
    )
}
