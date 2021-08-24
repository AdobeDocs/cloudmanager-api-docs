---
title: Cloud Manager Event Definitions
description: Cloud Manager Event Definitions
--- 

import data from '../../../swagger-specs/events.yaml'

import ModelDefinitions from "../../components/model-definitions"

# Event Definitions

<ModelDefinitions data={data} exclusions={['User', 'Organization', 'Pipeline Execution', 'Pipeline Execution Step State']} defaultOpen={['Pipeline Execution Start Event']} />