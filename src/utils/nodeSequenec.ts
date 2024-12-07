interface Node {
    id: string;
    type: string;
    position: { x: number; y: number };
    data?: any;
    [key: string]: any;
}

interface Edge {
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
    id: string;
}


function getNodeSequence(nodes: Node[], edges: Edge[]): Node[] {
    // Create a map of nodes for easy lookup
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    
    // Find the starting node (the node that isn't a target in any edge)
    const allTargets = new Set(edges.map(edge => edge.target));
    const startingNode = nodes.find(node => !allTargets.has(node.id));
    
    if (!startingNode) {
        throw new Error('No starting node found');
    }
    
    // Initialize the sequence and tracking variables
    const sequence: Node[] = [startingNode];
    let currentNodeId = startingNode.id;
    
    // Keep track of processed edges to avoid infinite loops
    const processedEdges = new Set<string>();
    
    // Traverse the edges to build the sequence
    while (true) {
        // Find the next edge that starts from the current node
        const nextEdge = edges.find(
            edge => edge.source === currentNodeId && !processedEdges.has(edge.id)
        );
        
        // If no more edges, we're done
        if (!nextEdge) break;
        
        // Mark this edge as processed
        processedEdges.add(nextEdge.id);
        
        // Find the next node
        const nextNode = nodeMap.get(nextEdge.target);
        
        if (!nextNode) {
            throw new Error(`Node with id ${nextEdge.target} not found`);
        }
        
        sequence.push(nextNode);
        
      
        currentNodeId = nextNode.id;
    }
    
    return sequence;
}