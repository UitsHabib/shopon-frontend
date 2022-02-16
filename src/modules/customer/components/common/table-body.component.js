import React from "react";

const TableBody = ({ columns, items }) => {
	return (
		<tbody>
			{items.map((item) => {
				return (
					<tr key={item.id}>
						{columns.map((column) => {
							return (
								<React.Fragment key={column.path}>
									{column.content(item, column.path)}
								</React.Fragment>
							);
						})}
					</tr>
				);
			})}
		</tbody>
	);
};

export default TableBody;
